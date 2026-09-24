'use client';
import { Heading, Text } from '@darcysm/bastet-ui';
import { useTranslations } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('About');

  return (
    <section id="about" style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <Heading level={2} highlight align="center" style={{ marginBottom: '24px' }}>{t('title')}</Heading>
      <Text variant="secondary" size="lg" style={{ lineHeight: '1.8' }}>
        {t('description')}
      </Text>
    </section>
  );
}
