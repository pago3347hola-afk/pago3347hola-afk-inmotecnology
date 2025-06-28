'use server';
/**
 * @fileOverview A flow for sending a payment proof email.
 *
 * - sendPaymentProof - A function that handles sending the payment proof.
 * - SendPaymentProofInput - The input type for the sendPaymentproof function.
 * - SendPaymentProofOutput - The return type for the sendPaymentProof function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { emailService } from '@/lib/email';

const SendPaymentProofInputSchema = z.object({
  userEmail: z.string().describe('The email address of the user sending the payment proof.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the payment proof, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type SendPaymentProofInput = z.infer<typeof SendPaymentProofInputSchema>;

const SendPaymentProofOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  emailId: z.string().optional(),
});
export type SendPaymentProofOutput = z.infer<typeof SendPaymentProofOutputSchema>;

export async function sendPaymentProof(input: SendPaymentProofInput): Promise<SendPaymentProofOutput> {
  return sendPaymentProofFlow(input);
}

const sendPaymentProofFlow = ai.defineFlow(
  {
    name: 'sendPaymentProofFlow',
    inputSchema: SendPaymentProofInputSchema,
    outputSchema: SendPaymentProofOutputSchema,
  },
  async (input) => {
    try {
      const base64Content = input.photoDataUri.split('base64,')[1];
      if (!base64Content) {
        throw new Error('Invalid data URI for payment proof image.');
      }
      
      const testRecipient = 'delivered@resend.dev';

      const { data } = await emailService.send({
        from: 'InmoTecnología <onboarding@resend.dev>',
        to: [testRecipient],
        subject: `[TEST] Comprobante recibido de ${input.userEmail}`,
        html: `
          <h1>¡La conexión con Resend funciona!</h1>
          <p>Este es un correo de prueba enviado a <strong>${testRecipient}</strong> para confirmar que la API de Resend está correctamente configurada.</p>
          <p>El comprobante fue enviado originalmente por: <strong>${input.userEmail}</strong>.</p>
          <p>El archivo adjunto es el comprobante que subió el usuario.</p>
          <hr>
          <h3>Siguientes Pasos:</h3>
          <p>Para recibir estos correos en tu propia bandeja de entrada durante la prueba, debes usar tu email de registro de Resend en el formulario de la aplicación.</p>
          <p>Una vez que verifiques tu dominio en Resend, podrás enviar correos desde tu propio dominio y a cualquier destinatario.</p>
        `,
        attachments: [
          {
            filename: 'comprobante.png',
            content: base64Content,
          },
        ],
      });

      return {
        success: true,
        message: `¡Conexión con Resend exitosa! Se envió un correo de prueba a '${testRecipient}'. Esto confirma que tu API key es correcta. Para recibir correos en tu inbox, usa tu email de registro de Resend en el formulario.`,
        emailId: data?.id,
      };
    } catch (error) {
      console.error('Failed to send payment proof:', error);
      
      let friendlyMessage = 'No se pudo enviar el comprobante. Por favor, inténtalo de nuevo más tarde.';
      if (error instanceof Error) {
        if (error.message.includes('you can only send emails to your own email address')) {
           friendlyMessage = `Error de Resend: El modo de prueba solo permite enviar correos a tu email verificado en Resend. Asegúrate que el correo que introdujiste (${input.userEmail}) sea el mismo con el que te registraste en resend.com.`;
        } else {
           friendlyMessage = `Ocurrió un error al enviar: ${error.message}`;
        }
      }

      return {
        success: false,
        message: friendlyMessage,
      };
    }
  }
);
