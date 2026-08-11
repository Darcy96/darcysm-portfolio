'use client';

import { HeroCreativeLayout, Button } from '@darcysm/bastet-ui';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Hero');

  return (
    <>
      <HeroCreativeLayout
        textContentSlot={
          <>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
              {t('title1')} <span style={{ color: 'var(--bst-primary)' }}>{t('title2')}</span>
            </h1>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--bst-text-secondary)', margin: '24px 0', maxWidth: '90%' }}>
              {t('description')}
            </p>
            <div className="bst-hero-creative__actions">
              <Button variant="primary" size="lg">{t('explore')}</Button>
              <Button variant="secondary" size="lg">{t('contact')}</Button>
            </div>
          </>
        }
        visualContentSlot={
          <div style={{ position: 'relative', width: '100%', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Background organic glow */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '350px',
                height: '350px',
                background: 'var(--bst-primary)',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                opacity: 0.15,
                filter: 'blur(30px)',
                zIndex: 0,
              }}
            />

            {/* Main Floating Card */}
            <div
              className="bst-floating-card"
              style={{
                position: 'relative',
                zIndex: 2,
                width: '280px',
                transform: 'rotate(-2deg)',
              }}
            >
              <h3 style={{ marginTop: 0, color: 'var(--bst-primary)' }}>{t('card1Title')}</h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                {t('card1Desc')}
              </p>
              <Button variant="primary" size="sm" style={{ width: '100%' }}>{t('card1Btn')}</Button>
            </div>

            {/* Accent Floating Pill */}
            <div
              className="bst-floating-card"
              style={{
                position: 'absolute',
                bottom: '15%',
                right: '10%',
                zIndex: 3,
                width: '160px',
                padding: '16px',
                borderRadius: 'calc(var(--bst-radius) * 3)',
                transform: 'rotate(6deg)',
              }}
            >
              <p style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0, textAlign: 'center' }}>
                {t('card2')}
              </p>
            </div>
          </div>
        }
      />

      {/* Divider */}
      <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--bst-border)', margin: '40px 0' }} />

      <section id="projects" style={{ padding: '40px 24px 80px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>{t('projectsTitle')}</h2>
        <p style={{ color: 'var(--bst-text-secondary)', marginBottom: '48px', fontSize: '1.125rem' }}>
          {t('projectsDesc')}
        </p>

        {/* Placeholder Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bst-floating-card"
              style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <p style={{ opacity: 0.5 }}>Project {i} Placeholder</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
