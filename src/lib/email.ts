import { Resend } from 'resend';
import 'dotenv/config';

// Ensure RESEND_API_KEY is loaded from .env file
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn(`
    ---------------------------------------------------------------------
    La variable RESEND_API_KEY no está configurada en tu archivo .env.
    El envío de correos se simulará en la consola.

    Para habilitar el envío real de correos:
    1. Regístrate para obtener una cuenta gratuita en https://resend.com
    2. Crea una clave de API en tu panel de Resend.
    3. Añade RESEND_API_KEY=tu_clave_de_api a tu archivo .env.
    ---------------------------------------------------------------------
  `);
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface SendEmailParams {
  to: string | string[];
  from: string;
  subject: string;
  html: string;
  attachments?: {
    filename: string;
    content: string; // base64 encoded content
  }[];
}

export const emailService = {
  async send(params: SendEmailParams) {
    // If Resend is not configured, simulate the email sending for development.
    if (!resend) {
      console.log('--- SIMULANDO CORREO (No se encontró la clave de API de Resend) ---');
      console.log('Para:', params.to);
      console.log('De:', params.from);
      console.log('Asunto:', params.subject);
      console.log('Archivos adjuntos:', params.attachments ? `${params.attachments.length} attachment(s)` : 'ninguno');
      console.log('----------------------------------------------------');
      return { data: { id: `simulated-${Date.now()}` }, error: null };
    }

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: params.from,
        to: params.to,
        subject: params.subject,
        html: params.html,
        attachments: params.attachments,
      });

      // The Resend SDK v3 returns an error object on failure, it doesn't throw.
      // We pass this result directly to the flow.
      if (error) {
        console.error('Error from Resend API:', error);
        return { data: null, error };
      }

      console.log(`Correo enviado exitosamente con ID: ${data?.id}`);
      return { data, error: null };

    } catch (e) {
      // This would catch network errors or other unexpected issues with the request itself.
      console.error('Error sending email via emailService:', e);
      // Ensure we return an error object that matches the Resend error structure.
      const err = e instanceof Error ? e : new Error('Unknown error in email service');
      return { data: null, error: { name: 'ServiceError', message: err.message } };
    }
  },
};
