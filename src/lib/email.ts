import { Resend } from 'resend';
import 'dotenv/config';

// Ensure RESEND_API_KEY is loaded from .env file
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn(`
    ---------------------------------------------------------------------
    RESEND_API_KEY is not set in your .env file.
    Email sending will be simulated in the console.

    To enable real email sending:
    1. Sign up for a free account at https://resend.com
    2. Create an API Key in your Resend dashboard.
    3. Add RESEND_API_KEY=your_api_key_here to your .env file.
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
      console.log('--- SIMULATING EMAIL (Resend API Key not found) ---');
      console.log('To:', params.to);
      console.log('From:', params.from);
      console.log('Subject:', params.subject);
      console.log('Attachments:', params.attachments ? `${params.attachments.length} attachment(s)` : 'none');
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

      console.log(`Email sent successfully with ID: ${data?.id}`);
      return { data, error: null };

    } catch (error) {
        console.error('Error sending email via Resend:', error);
        // Re-throw the error to be handled by the Genkit flow
        throw error;
    }
  },
};
