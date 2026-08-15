'use client';

import { useState, useMemo } from 'react';
import { BstThemeProvider, Navbar, Footer, LanguageSwitcher } from '@darcysm/bastet-ui';
import type { ThemeName } from '@darcysm/bastet-ui';
import { ThemeSwitcherContext } from './ThemeContext';
import { useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/routing';

// ─── ThemeShell ───────────────────────────────────────────────

/**
 * ThemeShell
 *
 * Client boundary that wraps the entire app with:
 *  1. ThemeSwitcherContext — so any page can call setTheme()
 *  2. BstThemeProvider — applies the selected Bastet UI theme
 */
export function ThemeShell({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<ThemeName>('light');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const contextValue = useMemo(
    () => ({
      activeTheme,
      setTheme: setActiveTheme,
    }),
    [activeTheme],
  );

  return (
    <ThemeSwitcherContext.Provider value={contextValue}>
      <BstThemeProvider theme={activeTheme}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar
            brand={<strong>Darcysm</strong>}
            links={[
              { label: 'Home', href: '/' },
              { label: 'Projects', href: '/#projects' },
              { label: 'About', href: '/#about' },
            ]}
            renderLink={(link, className, style) => (
              <Link href={link.href as any} className={className} style={style}>
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
            activeTheme={activeTheme}
            onThemeChange={setActiveTheme}
            sticky
          />
          
          <main style={{ flex: 1 }}>
            {children}
          </main>

          <Footer
            socials={[
              { platform: 'github', url: 'https://github.com/darcysm' },
              { platform: 'linkedin', url: 'https://linkedin.com/in/darcysm' },
              { platform: 'twitter', url: 'https://x.com/darcysm' }
            ]}
            copyright={`© ${new Date().getFullYear()} Darcysm. Creado con Bastet UI 🐱`}
          />
        </div>
      </BstThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
}
