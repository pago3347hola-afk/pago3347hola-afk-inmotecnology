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

      const { data } = await emailService.send({
        // IMPORTANT: In Resend's sandbox, 'from' MUST be 'onboarding@resend.dev'
        from: 'onboarding@resend.dev',
        // IMPORTANT: In Resend's sandbox, 'to' can ONLY be the email you signed up to Resend with.
        to: input.userEmail,
        subject: `[PRUEBA] Comprobante de Pago de ${input.userEmail}`,
        html: `
          <p>Se ha recibido un comprobante de pago de <strong>${input.userEmail}</strong>.</p>
          <p>Por favor, verifique el archivo adjunto.</p>
          <hr>
          <h3>NOTA IMPORTANTE PARA DESARROLLO:</h3>
          <p>Este es un correo de prueba enviado desde la aplicación InmoTecnología.</p>
          <ul>
            <li><strong>Remitente:</strong> onboarding@resend.dev (Modo Sandbox de Resend)</li>
            <li><strong>Destinatario de prueba:</strong> ${input.userEmail}</li>
            <li><strong>Destinatario final (en producción):</strong> pago3347hola@gmail.com</li>
          </ul>
          <p>Si estás recibiendo este correo, ¡la integración con Resend funciona!</p>
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
        message: `¡Prueba exitosa! Email enviado a ${input.userEmail}.`,
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
