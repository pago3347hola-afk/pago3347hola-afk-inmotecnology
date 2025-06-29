'use server';
/**
 * @fileOverview A flow for sending a support message from the contact form.
 *
 * - sendSupportMessage - A function that handles sending the support email.
 * - SendSupportMessageInput - The input type for the sendSupportMessage function.
 * - SendSupportMessageOutput - The return type for the sendSupportMessage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { emailService } from '@/lib/email';

const SendSupportMessageInputSchema = z.object({
  name: z.string().describe('The name of the user sending the message.'),
  email: z.string().email().describe('The email address of the user.'),
  subject: z.string().describe('The subject of the message.'),
  message: z.string().describe('The content of the support message.'),
});
export type SendSupportMessageInput = z.infer<typeof SendSupportMessageInputSchema>;

const SendSupportMessageOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type SendSupportMessageOutput = z.infer<typeof SendSupportMessageOutputSchema>;

export async function sendSupportMessage(input: SendSupportMessageInput): Promise<SendSupportMessageOutput> {
  return sendSupportMessageFlow(input);
}

const sendSupportMessageFlow = ai.defineFlow(
  {
    name: 'sendSupportMessageFlow',
    inputSchema: SendSupportMessageInputSchema,
    outputSchema: SendSupportMessageOutputSchema,
  },
  async (input) => {
    // The recipient email address. This should be the admin's email.
    const recipientEmail = 'pago3347hola@gmail.com';

    const { data, error } = await emailService.send({
      from: 'Soporte InmoTecnología <onboarding@resend.dev>',
      to: [recipientEmail],
      reply_to: input.email,
      subject: `Nuevo Mensaje de Soporte: ${input.subject}`,
      html: `
        <h1>Nuevo Mensaje de Soporte Recibido</h1>
        <p>Has recibido un nuevo mensaje desde el formulario de contacto de la web.</p>
        <hr>
        <p><strong>Nombre:</strong> ${input.name}</p>
        <p><strong>Email:</strong> ${input.email}</p>
        <p><strong>Asunto:</strong> ${input.subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="white-space: pre-wrap; background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${input.message}</p>
        <hr>
        <p>Por favor, responde a este cliente a la brevedad posible.</p>
      `,
    });

    if (error) {
      const errorMessage = `Error al enviar el correo: ${error.message}`;
      console.error('Flow failed to send email:', { error });
      return {
        success: false,
        message: errorMessage,
      };
    }

    const successMessage = '¡Mensaje enviado! Gracias por contactarnos, te responderemos pronto.';
    console.log(`Support email sent to ${recipientEmail}, ID: ${data?.id}`);

    return {
      success: true,
      message: successMessage,
    };
  }
);
