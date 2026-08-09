'use client';

import { createContext, useContext } from 'react';
import type { ThemeName } from '@darcysm/bastet-ui';

// ─── Context ──────────────────────────────────────────────────

interface ThemeSwitcherContextValue {
  activeTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

export const ThemeSwitcherContext = createContext<ThemeSwitcherContextValue>({
  activeTheme: 'light',
  setTheme: () => {},
});

// ─── Hook ─────────────────────────────────────────────────────

/**
 * useThemeSwitcher
 *
 * Access and change the active Bastet UI theme from any client component.
 *
 * @example
 * ```tsx
 * const { activeTheme, setTheme } = useThemeSwitcher();
 * setTheme('pink');
 * ```
 */
export function useThemeSwitcher() {
  return useContext(ThemeSwitcherContext);
}
