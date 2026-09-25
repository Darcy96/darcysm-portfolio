'use client';

import { useMemo } from 'react';
import { BstThemeProvider, Navbar, Footer, LanguageSwitcher, Heading } from '@darcysm/bastet-ui';
import type { ThemeName } from '@darcysm/bastet-ui';
import { ThemeSwitcherContext } from '../ThemeContext';
import { useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/routing';
import { useThemeShell } from './useThemeShell';

export interface ThemeShellProps {
  children: React.ReactNode;
  initialTheme?: ThemeName;
  initialPerformanceMode?: 'always' | 'never' | 'auto';
}

/**
 * ThemeShell
 *
 * Client boundary that wraps the entire app with:
 *  1. ThemeSwitcherContext — so any page can call setTheme()
 *  2. BstThemeProvider — applies the selected Bastet UI theme
 */
export function ThemeShell({ children, initialTheme, initialPerformanceMode }: ThemeShellProps) {
  const { 
    activeTheme, 
    perfMode, 
    handleThemeChange, 
    handlePerfChange 
  } = useThemeShell({ initialTheme, initialPerformanceMode });

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const contextValue = useMemo(
    () => ({
      activeTheme,
      setTheme: handleThemeChange,
    }),
    [activeTheme, handleThemeChange],
  );

  return (
    <ThemeSwitcherContext.Provider value={contextValue}>
      <BstThemeProvider theme={activeTheme} performanceMode={perfMode}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar
            brand={<Heading level={5} highlight noMargin>Darcy Solarte M.</Heading>}
            links={[
              { label: 'Home', href: '/' },
            ]}
            renderLink={(link, className, style) => (
              <Link href={link.href as React.ComponentProps<typeof Link>['href']} className={className} style={style}>
                {link.label}
              </Link>
            )}
            languageSwitcherSlot={
              <LanguageSwitcher
                activeLocale={locale}
                locales={[
                  { value: 'en', label: 'EN', icon: '🇺🇸' },
                  { value: 'es', label: 'ES', icon: '🇲🇽' },
                ]}
                onLocaleChange={(newLocale) => {
                  router.replace(pathname, { locale: newLocale });
                }}
                size="sm"
                variant="dropdown"
              />
            }
            performanceToggleSlot={
              <button
                onClick={() => handlePerfChange(perfMode === 'always' ? 'never' : 'always')}
                title={perfMode === 'always' ? "Performance Mode ON" : "Performance Mode OFF"}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--bst-border)',
                  color: perfMode === 'always' ? 'var(--bst-primary)' : 'var(--bst-text-secondary)',
                  borderRadius: 'var(--bst-radius)',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                }}
              >
                {perfMode === 'always' ? '⚡ ECO' : '✨ GFX'}
              </button>
            }
            activeTheme={activeTheme}
            onThemeChange={handleThemeChange}
            sticky
          />

          <main id="main-content" style={{ flex: 1 }}>
            {children}
          </main>

          <Footer
            socials={[
              { platform: 'github', url: 'https://github.com/darcysm' },
              { platform: 'linkedin', url: 'https://linkedin.com/in/darcysm' },
              { platform: 'twitter', url: 'https://x.com/darcysm' }
            ]}
            copyright={`© ${new Date().getFullYear()} Darcysm. Creado con Bastet UI`}
          />
        </div>
      </BstThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
}
