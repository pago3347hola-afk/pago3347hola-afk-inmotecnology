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
    const base64Content = input.photoDataUri.split(';base64,').pop();

    if (!base64Content) {
      return {
        success: false,
        message: 'Error: El formato de la imagen no es válido. Asegúrate de subir un archivo de imagen.',
      };
    }
    
    // The recipient email address. This should be the admin's email.
    const recipientEmail = 'pago3347hola@gmail.com';

    const { data, error } = await emailService.send({
      from: 'InmoTecnología <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `Nuevo Comprobante de Pago de: ${input.userEmail}`,
      html: `
        <h1>Nuevo Comprobante de Pago</h1>
        <p>Se ha recibido un comprobante de pago del usuario <strong>${input.userEmail}</strong>.</p>
        <p>La imagen del comprobante se encuentra adjunta en este correo.</p>
        <p>Por favor, verifica el pago y acredita el saldo correspondiente.</p>
      `,
      attachments: [
        {
          filename: 'comprobante.png',
          content: base64Content,
        },
      ],
    });

    if (error) {
      const errorMessage = `Error al enviar el correo: ${error.message}`;
      console.error('Flow failed to send email:', { error });
      return {
        success: false,
        message: errorMessage,
      };
    }

    const successMessage = '¡Comprobante enviado! Lo revisaremos y acreditaremos tu saldo pronto.';
    console.log(`Email sent to ${recipientEmail}, ID: ${data?.id}`);

    return {
      success: true,
      message: successMessage,
      emailId: data?.id,
    };
  }
);
