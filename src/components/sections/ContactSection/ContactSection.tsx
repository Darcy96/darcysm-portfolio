'use client';

import { useTranslations } from 'next-intl';
import { ContactForm } from './ContactForm';

// ─── ContactSection ───────────────────────────────────────────

export function ContactSection() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" style={{ padding: '30px 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', textAlign: 'center' }}>
          {t('title')}
        </h2>
        <p
          style={{
            fontSize: '1.125rem',
            color: 'var(--bst-text-secondary)',
            textAlign: 'center',
            marginBottom: '40px',
            lineHeight: 1.6,
          }}
        >
          {t('description')}
        </p>

        <ContactForm />
      </div>
    </section>
  );
}
