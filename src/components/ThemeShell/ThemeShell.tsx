'use client';

import { useMemo } from 'react';
import { BstThemeProvider, Navbar, Footer, LanguageSwitcher, Heading, Dropdown, Button } from '@darcysm/bastet-ui';
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
            links={[]}
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
              <Dropdown>
                <Dropdown.Trigger>
                  <Button
                    size="sm"
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <span>{perfMode === 'always' ? '⚡' : '✨'}</span>
                    <span>{perfMode === 'always' ? 'ECO' : 'GFX'}</span>
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Content align="center">
                  <Dropdown.Item
                    icon="✨"
                    onClick={() => handlePerfChange('never')}
                    style={{ backgroundColor: perfMode === 'never' ? 'rgba(128, 128, 128, 0.1)' : 'transparent' }}
                  >
                    High Fidelity
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon="⚡"
                    onClick={() => handlePerfChange('always')}
                    style={{ backgroundColor: perfMode === 'always' ? 'rgba(128, 128, 128, 0.1)' : 'transparent' }}
                  >
                    Eco Mode
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
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
              { platform: 'github', url: 'https://github.com/Darcy96' },
              { platform: 'linkedin', url: 'https://www.linkedin.com/in/darcysolarte96' }
            ]}
            copyright={`© ${new Date().getFullYear()} Darcysm. Creado con Bastet UI`}
          />
        </div>
      </BstThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
}
