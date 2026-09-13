'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea, Select, Button, useToast, CopyPill, Text } from '@darcysm/bastet-ui';
import type { SelectOption } from '@darcysm/bastet-ui';
import { contactSchema, SUBJECT_OPTIONS, type ContactFormData } from '@/validations/contact.schema';
import { sendContactEmail } from '@/actions/contact.actions';
import { useTranslations } from 'next-intl';

// ─── Component ────────────────────────────────────────────────

export function ContactForm() {
  const t = useTranslations('Contact');
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: undefined,
      message: '',
    },
  });

  // Build select options from the enum with i18n labels
  const subjectOptions: SelectOption[] = SUBJECT_OPTIONS.map((key) => ({
    value: key,
    label: t(`subjects.${key}`),
  }));

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await sendContactEmail(data);

      if (result.success) {
        toast.success(t('toast.success'));
        reset();
      } else {
        toast.error(result.error || t('toast.error'));
      }
    } catch {
      toast.error(t('toast.error'));
    }
  };

  // Resolve i18n error messages from the Zod error keys
  const resolveError = (errorMsg?: string) => {
    if (!errorMsg) return undefined;
    // If the error key starts with 'validation.', treat it as an i18n key
    if (errorMsg.startsWith('validation.')) {
      return t(errorMsg);
    }
    return errorMsg;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <Input
            label={t('fields.name')}
            placeholder={t('placeholders.name')}
            error={resolveError(errors.name?.message)}
            {...register('name')}
          />
          <Input
            label={t('fields.email')}
            placeholder={t('placeholders.email')}
            type="email"
            error={resolveError(errors.email?.message)}
            {...register('email')}
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <Select
            label={t('fields.subject')}
            placeholder={t('placeholders.subject')}
            options={subjectOptions}
            error={resolveError(errors.subject?.message)}
            {...register('subject')}
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <Textarea
            label={t('fields.message')}
            placeholder={t('placeholders.message')}
            rows={5}
            error={resolveError(errors.message?.message)}
            {...register('message')}
          />
        </div>

        <div style={{ marginTop: '28px' }}>
          <Button
            variant="primary"
            size="lg"
            htmlType="submit"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? t('sending') : t('submit')}
          </Button>
        </div>
      </form>

      {/* Alternative Contact Divider */}
      <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color, var(--bst-border))' }} />
        <Text inline variant="secondary" size="sm" weight="medium">
          or
        </Text>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color, var(--bst-border))' }} />
      </div>

      {/* Copy Email Pill */}
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <CopyPill 
          value="darcysolarte@gmail.com" 
          onCopy={() => toast.success('Email copiado al portapapeles')}
        />
      </div>
    </>
  );
}
