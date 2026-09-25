import { z } from 'zod/v4';

// ─── Subject Options ──────────────────────────────────────────

export const SUBJECT_OPTIONS = ['freelance', 'job', 'collaboration', 'other'] as const;

export type SubjectOption = (typeof SUBJECT_OPTIONS)[number];

// ─── Schema ───────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'validation.nameMin'),

  email: z
    .string()
    .email('validation.emailInvalid'),

  subject: z
    .enum(SUBJECT_OPTIONS, {
      error: 'validation.subjectRequired',
    }),

  subjectLabel: z.string().optional(),

  message: z
    .string()
    .min(10, 'validation.messageMin'),
});

// ─── Inferred Type ────────────────────────────────────────────

export type ContactFormData = z.infer<typeof contactSchema>;
