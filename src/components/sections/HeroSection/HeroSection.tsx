'use client';

import { HeroCreativeLayout, Button } from '@darcysm/bastet-ui';
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('Hero');

  const mainCard = (
    <>
      <h3 style={{ marginTop: 0, color: 'var(--bst-primary)' }}>{t('card1Title')}</h3>
      <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
        {t('card1Desc')}
      </p>
      <Button variant="primary" size="sm" style={{ width: '100%' }}>{t('card1Btn')}</Button>
    </>
  );

  const pillCard = (
    <p style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0, textAlign: 'center' }}>
      {t('card2')}
    </p>
  );

  const handleScrollToExperience = () => {
    const element = document.getElementById('experience');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <HeroCreativeLayout
      titleSlot={
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
          {t('title1')} <span style={{ color: 'var(--bst-primary)' }}>{t('title2')}</span>
        </h1>
      }
      descriptionSlot={
        <p style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--bst-text-secondary)', margin: '0', maxWidth: '90%' }}>
          {t('description')}
        </p>
      }
      actionsSlot={
        <div className="bst-hero-creative__actions">
          <Button variant="primary" size="lg" onClick={handleScrollToExperience}>{t('explore')}</Button>
          <Button variant="secondary" size="lg">{t('contact')}</Button>
        </div>
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
            {mainCard}
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
            {pillCard}
          </div>
        </div>
      }
      mobileCarouselItems={[
        <div key="desc" style={{ padding: '0 24px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--bst-text-secondary)', margin: 0 }}>
            {t('description')}
          </p>
        </div>,
        <div key="main" className="bst-floating-card" style={{ width: '280px', margin: '0 auto' }}>
          {mainCard}
        </div>,
        <div key="pill" className="bst-floating-card" style={{ width: '240px', padding: '24px', margin: '0 auto', borderRadius: 'calc(var(--bst-radius) * 3)' }}>
          {pillCard}
        </div>
      ]}
    />
  );
}
