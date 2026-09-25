'use client';

import { HeroCreativeLayout, Button, Heading, Text } from '@darcysm/bastet-ui';
import { useHeroSection } from './useHeroSection';

export function HeroSection() {
  const { t, handleScrollToExperience, handleScrollToContact } = useHeroSection();

  const mainCard = (
    <>
      <Heading level={3} highlight noMargin>{t('card1Title')}</Heading>
      <Text variant="secondary" size="sm">
        {t('card1Desc')}
      </Text>
      <Button 
        variant="primary" 
        size="sm" 
        style={{ width: '100%' }}
        onClick={() => window.open('https://6ab5ea6d54399a5836d515ac-hgprgiexre.chromatic.com/', '_blank')}
      >
        {t('card1Btn')}
      </Button>
    </>
  );

  const pillCard = (
    <Text size="sm" weight="medium" align="center" style={{ margin: 0 }}>
      {t('card2')}
    </Text>
  );

  return (
    <HeroCreativeLayout
      titleSlot={
        <Heading level={1} highlight noMargin style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          {t('title1')} {t('title2')}
        </Heading>
      }
      descriptionSlot={
        <Text variant="secondary" size="lg" style={{ margin: 0, maxWidth: '90%' }}>
          {t('description')}
        </Text>
      }
      actionsSlot={
        <div className="bst-hero-creative__actions">
          <Button variant="primary" size="lg" onClick={handleScrollToExperience}>{t('explore')}</Button>
          <Button variant="secondary" size="lg" onClick={handleScrollToContact}>{t('contact')}</Button>
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
            style={{
              position: 'relative',
              zIndex: 2,
              width: '280px',
              transform: 'rotate(-2deg)',
            }}
          >
            <div className="bst-floating-card">
              {mainCard}
            </div>
          </div>

          {/* Secondary Pill Card (Decorative) */}
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '10%',
              zIndex: 3,
              transform: 'rotate(6deg)',
            }}
          >
            <div
              className="bst-floating-card"
              style={{
                width: '160px',
                padding: '16px',
                borderRadius: 'calc(var(--bst-radius) * 3)',
              }}
            >
              {pillCard}
            </div>
          </div>
        </div>
      }
      mobileCarouselItems={[
        <div key="desc" style={{ padding: '0 24px', textAlign: 'center' }}>
          <Text variant="secondary" size="lg" style={{ margin: 0 }}>
            {t('description')}
          </Text>
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
