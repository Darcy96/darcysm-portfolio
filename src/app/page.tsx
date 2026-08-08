'use client';

import { Button, themeNames, useBstTheme } from '@darcysm/bastet-ui';
import type { ThemeName, ButtonVariant, ButtonSize } from '@darcysm/bastet-ui';
import { useThemeSwitcher } from '@/components/ThemeContext';
import styles from './page.module.css';

// ─── Theme display labels ────────────────────────────────────

const themeLabels: Record<ThemeName, string> = {
  light: '☀️  Light',
  dark: '🌙  Dark',
  oriental: '🏯  Oriental',
  'black-metal': '🤘  Black Metal',
  barbie: '💖  Barbie',
};

// ─── Variant × Size matrix ──────────────────────────────────

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

// ─── Page ─────────────────────────────────────────────────────

export default function HomePage() {
  const { activeTheme, setTheme } = useThemeSwitcher();
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

      {/* Theme Selector */}
      <section className={styles.selectorSection}>
        <p className={styles.sectionLabel}>Select Theme</p>
        <div className={styles.themeGrid}>
          {themeNames.map((name) => (
            <Button
              key={name}
              variant={name === activeTheme ? 'primary' : 'secondary'}
              size="md"
              onClick={() => setTheme(name)}
            >
              {themeLabels[name]}
            </Button>
          ))}
        </div>
      </section>

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
