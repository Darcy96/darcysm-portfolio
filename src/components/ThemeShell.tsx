'use client';

import { useState, useMemo, useEffect } from 'react';
import { BstThemeProvider, Navbar, Footer, LanguageSwitcher, Heading } from '@darcysm/bastet-ui';
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
export function ThemeShell({ 
  children, 
  initialTheme,
  initialPerformanceMode
}: { 
  children: React.ReactNode; 
  initialTheme?: ThemeName;
  initialPerformanceMode?: 'always' | 'never' | 'auto';
}) {
  const [activeTheme, setActiveTheme] = useState<ThemeName>(initialTheme || 'light');
  const [perfMode, setPerfMode] = useState<'always' | 'never'>(() => {
    if (initialPerformanceMode === 'always' || initialPerformanceMode === 'never') return initialPerformanceMode;
    // Fallback to detecting OS and Network if no cookie
    if (typeof window !== 'undefined') {
      // 1. Accessibility: OS prefers reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'always';
      
      // 2. Network: Data Saver mode or slow connection (2g/3g)
      const nav = navigator as any;
      if (nav.connection) {
        if (nav.connection.saveData) return 'always';
        if (nav.connection.effectiveType === 'slow-2g' || nav.connection.effectiveType === '2g' || nav.connection.effectiveType === '3g') return 'always';
      }
    }
    return 'never';
  });
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Dynamic Favicon Effect
  useEffect(() => {
    // Map theme to colors for the favicon
    const themeColors: Record<ThemeName, { bg: string, text: string }> = {
      light: { bg: '#F8FAFC', text: '#0F172A' },
      dark: { bg: '#0F172A', text: '#FFFFFF' },
      oriental: { bg: '#E63946', text: '#FFFFFF' },
      'black-metal': { bg: '#111111', text: '#E5E7EB' },
      pink: { bg: '#EC4899', text: '#FFFFFF' },
      'white-city': { bg: '#D97757', text: '#FFFFFF' },
    };

    const colors = themeColors[activeTheme] || themeColors.light;
    
    // Minimalist SVG with "DS"
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect width="100" height="100" rx="24" fill="${colors.bg}" />
        <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="46" letter-spacing="-2" fill="${colors.text}">DS</text>
      </svg>
    `.trim();

    // Safer encoding for SVG in data URL
    const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;

    // Remove any existing favicons injected by Next.js
    const existingLinks = document.querySelectorAll("link[rel~='icon']");
    existingLinks.forEach(link => link.remove());

    // Create and inject the new dynamic favicon
    const newLink = document.createElement('link');
    newLink.rel = 'icon';
    newLink.type = 'image/svg+xml';
    newLink.href = dataUrl;
    document.head.appendChild(newLink);
  }, [activeTheme]);

  // Load saved theme on mount as a fallback if cookie was missing
  // Removed useEffect to prevent cascading renders and hydration mismatches.
  // The initial theme is now strictly provided by the server via cookies.

  const handleThemeChange = (theme: ThemeName) => {
    setActiveTheme(theme);
    localStorage.setItem('bst-theme', theme);
    document.cookie = `bst-theme=${theme}; path=/; max-age=31536000`;
  };

  const handlePerfChange = (mode: 'always' | 'never') => {
    setPerfMode(mode);
    document.cookie = `bst-performance=${mode}; path=/; max-age=31536000`;
  };

  const contextValue = useMemo(
    () => ({
      activeTheme,
      setTheme: handleThemeChange,
    }),
    [activeTheme],
  );

  return (
    <ThemeSwitcherContext.Provider value={contextValue}>
      <BstThemeProvider theme={activeTheme} performanceMode={perfMode}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar
            brand={<Heading level={5} highlight noMargin>Darcy Solarte M.</Heading>}
            links={[
              { label: 'Home', href: '/' },
              // { label: 'Projects', href: '/#projects' },
              //{ label: 'About', href: '/#about' },
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
