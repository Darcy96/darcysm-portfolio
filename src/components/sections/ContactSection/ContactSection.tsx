'use client';

import { useTranslations } from 'next-intl';
import { Heading, Text, Input, Textarea, Select, Button, CopyPill } from '@darcysm/bastet-ui';
import { useContactForm } from './useContactForm';

// ─── ContactSection ───────────────────────────────────────────

export function ContactSection() {
  const t = useTranslations('Contact');
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    subjectOptions,
    resolveError,
    handleCopyEmail,
  } = useContactForm();

  return (
    <section id="contact" style={{ padding: '30px 24px', scrollMarginTop: '80px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <Heading level={2} highlight align="center" noMargin>
          {t('title')}
        </Heading>
        <Text variant="secondary" size="lg" align="center" style={{ marginBottom: '40px', marginTop: '8px' }}>
          {t('description')}
        </Text>

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
            onCopy={handleCopyEmail}
          />
        </div>
      </div>
    </section>
  );
}
