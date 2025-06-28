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

      if (error) {
        // This will be caught by the calling flow
        throw new Error(error.message);
      }

      console.log(`Correo enviado exitosamente con ID: ${data?.id}`);
      return { data, error: null };

    } catch (error) {
        console.error('Error al enviar correo a través de Resend:', error);
        // Re-throw the error to be handled by the Genkit flow
        throw error;
    }
  },
};
