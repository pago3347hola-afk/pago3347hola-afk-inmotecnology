'use server';
/**
 * @fileOverview A flow for handling withdrawal requests.
 *
 * - requestWithdrawal - A function that processes the withdrawal request.
 * - RequestWithdrawalInput - The input type for the requestWithdrawal function.
 * - RequestWithdrawalOutput - The return type for the requestWithdrawal function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { emailService } from '@/lib/email';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const RequestWithdrawalInputSchema = z.object({
  uid: z.string().describe("The user's unique ID."),
  amount: z.number().describe('The amount of money to withdraw.'),
  beneficiaryName: z.string().describe('The full name of the account holder.'),
  clabe: z.string().optional().describe('The 18-digit CLABE for bank transfer.'),
  cardNumber: z.string().optional().describe('The 16-digit debit/credit card number.'),
  userEmail: z.string().email().describe("The user's email to send notifications."),
});
export type RequestWithdrawalInput = z.infer<typeof RequestWithdrawalInputSchema>;

const RequestWithdrawalOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type RequestWithdrawalOutput = z.infer<typeof RequestWithdrawalOutputSchema>;

export async function requestWithdrawal(input: RequestWithdrawalInput): Promise<RequestWithdrawalOutput> {
  return requestWithdrawalFlow(input);
}

const requestWithdrawalFlow = ai.defineFlow(
  {
    name: 'requestWithdrawalFlow',
    inputSchema: RequestWithdrawalInputSchema,
    outputSchema: RequestWithdrawalOutputSchema,
  },
  async (input) => {
    // --- Server-Side Security Check ---
    const userDocRef = doc(db, 'users', input.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return { success: false, message: 'Error de seguridad: Usuario no encontrado.' };
    }

    const userData = userDoc.data();
    if (userData.balance < input.amount) {
      return { success: false, message: 'No tienes saldo suficiente para realizar este retiro.' };
    }
    // --- End of Security Check ---

    // Admin's email for receiving notifications
    const adminEmail = 'pago3347hola@gmail.com';

    const formattedAmount = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(input.amount);

    const { data, error } = await emailService.send({
      from: 'Sistema InmoTecnología <onboarding@resend.dev>',
      to: [adminEmail],
      reply_to: input.userEmail,
      subject: `Nueva Solicitud de Retiro por ${formattedAmount}`,
      html: `
        <h1>Nueva Solicitud de Retiro</h1>
        <p>Se ha recibido una nueva solicitud de retiro de fondos. Por favor, procesa la transferencia manualmente con los siguientes datos:</p>
        <hr>
        <p><strong>Cliente:</strong> ${input.userEmail}</p>
        <p><strong>Monto a Retirar:</strong> <strong style="font-size: 1.2em;">${formattedAmount}</strong></p>
        <h2>Detalles Bancarios</h2>
        <p><strong>Beneficiario:</strong> ${input.beneficiaryName}</p>
        <p><strong>CLABE:</strong> ${input.clabe || 'No proporcionada'}</p>
        <p><strong>Número de Tarjeta:</strong> ${input.cardNumber || 'No proporcionado'}</p>
        <hr>
        <p>Una vez completada la transferencia, notifica al cliente.</p>
      `,
    });

    if (error) {
      const errorMessage = `Error al enviar el correo: ${error.message}`;
      console.error('Flow failed to send withdrawal email:', { error });
      return {
        success: false,
        message: errorMessage,
      };
    }
    
    const successMessage = 'Tu solicitud de retiro ha sido enviada. Se procesará en 2-3 días hábiles.';
    return {
      success: true,
      message: successMessage,
    };
  }
);
