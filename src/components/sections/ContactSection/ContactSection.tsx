'use client';

import { useTranslations } from 'next-intl';
import { Heading, Text } from '@darcysm/bastet-ui';
import { ContactForm } from './ContactForm';

// ─── ContactSection ───────────────────────────────────────────

export function ContactSection() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" style={{ padding: '30px 24px', scrollMarginTop: '80px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <Heading level={2} highlight align="center" noMargin>
          {t('title')}
        </Heading>
        <Text variant="secondary" size="lg" align="center" style={{ marginBottom: '40px', marginTop: '8px' }}>
          {t('description')}
        </Text>

        <ContactForm />
      </div>
    </section>
  );
}
