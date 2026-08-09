'use client';

import { Button, useBstTheme } from '@darcysm/bastet-ui';
import type { ButtonVariant, ButtonSize } from '@darcysm/bastet-ui';
import { useThemeSwitcher } from '@/components/ThemeContext';
import styles from './page.module.css';

// ─── Variant × Size matrix ──────────────────────────────────

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

// ─── Page ─────────────────────────────────────────────────────

export default function HomePage() {
  const { activeTheme } = useThemeSwitcher();
  const { token } = useBstTheme();

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Bastet UI × Portfolio</h1>
        <p className={styles.subtitle}>
          Live theme integration test — switch presets and watch the magic
        </p>
      </header>

      {/* Button Showcase */}
      <section className={styles.showcaseSection}>
        <p className={styles.sectionLabel}>Button Showcase</p>

        {variants.map((variant) => (
          <div key={variant} className={styles.variantGroup}>
            <div className={styles.variantTitle}>
              <span className={styles.variantTitleText}>{variant}</span>
            </div>
            <div className={styles.buttonRow}>
              {sizes.map((size) => (
                <Button key={size} variant={variant} size={size}>
                  {variant} {size}
                </Button>
              ))}
              <Button variant={variant} size="md" disabled>
                disabled
              </Button>
            </div>
          </div>
        ))}
      </section>

      {/* Info Card */}
      <div
        className={styles.infoCard}
        style={{
          borderColor: token.colorBorder,
          backgroundColor: `${token.colorPrimary}08`,
        }}
      >
        Active theme: <strong>{activeTheme}</strong> ·
        Font: <code>{token.fontFamily?.split(',')[0]}</code> ·
        Primary: <code>{token.colorPrimary}</code> ·
        Border Radius: <code>{token.borderRadius}px</code>
      </div>
    </div>
  );
}
