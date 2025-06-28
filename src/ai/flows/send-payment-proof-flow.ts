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
      // Usando el código de prueba para confirmar la conexión con Resend.
      // NOTA: 'onboarding@resend.dev' solo puede enviar a 'delivered@resend.dev' en el modo de prueba.
      const { data } = await emailService.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['delivered@resend.dev'],
        subject: 'Hola Mundo',
        html: '<strong>¡Funciona!</strong>',
      });
      
      const successMessage = `¡Éxito! Correo de prueba enviado a 'delivered@resend.dev'. ID: ${data?.id}. Esto confirma que tu clave de API de Resend es correcta.`;
      console.log({ data });

      return {
        success: true,
        message: successMessage,
        emailId: data?.id,
      };

    } catch (error) {
      let errorMessage = 'Ocurrió un error desconocido.';
      if (error instanceof Error) {
           errorMessage = `Error al enviar el correo: ${error.message}`;
      }
      console.error({ error });

      return {
        success: false,
        message: errorMessage,
      };
    }
  }
);
