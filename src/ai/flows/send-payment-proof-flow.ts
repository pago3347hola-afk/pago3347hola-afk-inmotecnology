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
      // Using the user-provided hardcoded example to test the Resend integration.
      const { data } = await emailService.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['delivered@resend.dev'], // Using Resend's special test address
        subject: 'Hello World',
        html: '<strong>It works!</strong>',
      });

      return {
        success: true,
        message: `¡Éxito! El correo de prueba se envió a 'delivered@resend.dev'. ID de envío: ${data?.id}`,
        emailId: data?.id,
      };
    } catch (error) {
      console.error('Failed to send test email:', error);
      
      let friendlyMessage = 'No se pudo enviar el correo de prueba. Por favor, inténtalo de nuevo más tarde.';
      if (error instanceof Error) {
           friendlyMessage = `Ocurrió un error al enviar: ${error.message}`;
      }

      return {
        success: false,
        message: friendlyMessage,
      };
    }
  }
);