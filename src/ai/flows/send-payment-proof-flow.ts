'use server';
/**
 * @fileOverview A flow for sending a payment proof email.
 *
 * - sendPaymentProof - A function that handles sending the payment proof.
 * - SendPaymentProofInput - The input type for the sendPaymentProof function.
 * - SendPaymentProofOutput - The return type for the sendPaymentProof function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const SendPaymentProofInputSchema = z.object({
  userEmail: z.string().describe('The email address of the user sending the payment proof.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the payment proof, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SendPaymentProofInput = z.infer<typeof SendPaymentProofInputSchema>;

export const SendPaymentProofOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
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
    console.log('Received payment proof submission:');
    console.log('User Email:', input.userEmail);
    console.log('Photo URI starts with:', input.photoDataUri.substring(0, 100) + '...');
    
    // =================================================================================
    // TODO: REAL EMAIL INTEGRATION
    // In a real application, you would integrate an email sending service
    // like Nodemailer, SendGrid, or Resend here.
    // For this example, we'll just simulate a successful submission.
    //
    // Example with a hypothetical email service:
    //
    // import { emailService } from '@/lib/email'; // (you would create this)
    // await emailService.send({
    //   to: 'pago3347hola@gmail.com',
    //   from: 'noreply@inmotecnologia.com',
    //   subject: `Payment Proof from ${input.userEmail}`,
    //   html: `<p>Payment proof received from ${input.userEmail}.</p>`,
    //   attachments: [
    //     {
    //       filename: 'payment-proof.png',
    //       content: input.photoDataUri.split('base64,')[1],
    //       encoding: 'base64',
    //     },
    //   ],
    // });
    // =================================================================================
    
    return {
      success: true,
      message: 'Proof submitted successfully (simulation).',
    };
  }
);
