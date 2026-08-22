'use server';

import { Resend } from 'resend';
import { contactSchema, type ContactFormData } from '@/validations/contact.schema';

// ─── Response Type ────────────────────────────────────────────

export interface ActionResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── Server Action ────────────────────────────────────────────

const SUBJECT_LABELS: Record<string, string> = {
  freelance: 'Proyecto Freelance',
  job: 'Oportunidad Laboral',
  collaboration: 'Colaboración',
  other: 'Otro',
};

export async function sendContactEmail(
  formData: ContactFormData,
): Promise<ActionResponse<{ id: string }>> {
  // 1. Re-validate on the server (defense in depth)
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: 'Invalid form data. Please check your inputs.',
    };
  }

  // 2. Check environment variables
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey) {
    console.error('[Contact] Missing RESEND_API_KEY environment variable');
    return {
      success: false,
      error: 'Email service is not configured. Please try again later.',
    };
  }

  if (!contactEmail) {
    console.error('[Contact] Missing CONTACT_EMAIL environment variable');
    return {
      success: false,
      error: 'Email recipient is not configured. Please try again later.',
    };
  }

  // 3. Send email via Resend
  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [contactEmail],
      replyTo: parsed.data.email,
      subject: `[Portfolio] ${SUBJECT_LABELS[parsed.data.subject] || parsed.data.subject} — ${parsed.data.name}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1677FF; border-bottom: 2px solid #f0f0f0; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #555; width: 100px;">Name</td>
              <td style="padding: 8px 12px;">${parsed.data.name}</td>
            </tr>
            <tr style="background-color: #fafafa;">
              <td style="padding: 8px 12px; font-weight: 600; color: #555;">Email</td>
              <td style="padding: 8px 12px;">
                <a href="mailto:${parsed.data.email}" style="color: #1677FF;">${parsed.data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #555;">Subject</td>
              <td style="padding: 8px 12px;">${SUBJECT_LABELS[parsed.data.subject] || parsed.data.subject}</td>
            </tr>
          </table>

          <div style="background-color: #f9f9f9; border-radius: 8px; padding: 16px; margin-top: 16px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #555;">Message</h3>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${parsed.data.message}</p>
          </div>

          <p style="font-size: 12px; color: #999; margin-top: 24px; text-align: center;">
            Sent from darcysm.dev portfolio contact form
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('[Contact] Resend API error:', error);
      return {
        success: false,
        error: 'Failed to send email. Please try again later.',
      };
    }

    return {
      success: true,
      data: { id: data?.id || 'unknown' },
    };
  } catch (err) {
    console.error('[Contact] Unexpected error:', err);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
