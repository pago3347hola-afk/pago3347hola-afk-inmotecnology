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
      "A photo of the payment proof, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
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
        to: 'pago3347hola@gmail.com',
        // IMPORTANT: In production, you must use a verified domain with Resend.
        // For development, 'onboarding@resend.dev' is permitted.
        from: 'onboarding@resend.dev',
        subject: `Comprobante de Pago de ${input.userEmail}`,
        html: `<p>Se ha recibido un comprobante de pago de <strong>${input.userEmail}</strong>.</p><p>Por favor, verifique el archivo adjunto.</p>`,
        attachments: [
          {
            filename: 'comprobante.png',
            content: base64Content,
          },
        ],
      });

      return {
        success: true,
        message: '¡Comprobante enviado con éxito! Lo revisaremos pronto.',
        emailId: data?.id,
      };
    } catch (error) {
      console.error('Failed to send payment proof:', error);
      
      let friendlyMessage = 'No se pudo enviar el comprobante. Por favor, inténtalo de nuevo más tarde.';
      if (error instanceof Error) {
        // Check for the specific Resend development mode error.
        if (error.message.includes('you can only send emails to your own email address')) {
           friendlyMessage = 'Error de Resend: Cuando usas "onboarding@resend.dev", solo puedes enviar correos a tu propio email (el que usaste para registrarte en Resend). Verifica que el correo de destino sea el correcto o configura un dominio verificado en Resend para enviar a otras direcciones.';
        } else {
           // For other errors, show the actual message.
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
