'use client';

import { useState, useMemo } from 'react';
import { BstThemeProvider } from '@darcysm/bastet-ui';
import type { ThemeName } from '@darcysm/bastet-ui';
import { ThemeSwitcherContext } from './ThemeContext';

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
        {children}
      </BstThemeProvider>
    </ThemeSwitcherContext.Provider>
  );
}
