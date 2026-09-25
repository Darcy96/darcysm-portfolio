import { useState, useEffect } from 'react';
import type { ThemeName } from '@darcysm/bastet-ui';
import { THEME_FAVICON_COLORS } from './constants';

interface UseThemeShellProps {
  initialTheme?: ThemeName;
  initialPerformanceMode?: 'always' | 'never' | 'auto';
}

export function useThemeShell({ initialTheme, initialPerformanceMode }: UseThemeShellProps) {
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

  // Dynamic Favicon Effect
  useEffect(() => {
    const colors = THEME_FAVICON_COLORS[activeTheme] || THEME_FAVICON_COLORS.light;
    
    // Minimalist SVG with "DS"
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect width="100" height="100" rx="24" fill="${colors.bg}" />
        <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="800" font-size="46" letter-spacing="-2" fill="${colors.text}">DS</text>
      </svg>
    `.trim();

    // Safer encoding for SVG in data URL
    const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;

    // Instead of removing elements (which crashes React's DOM diffing during navigation),
    // we simply update all existing favicon links Next.js injected.
    const existingLinks = document.querySelectorAll("link[rel~='icon']");
    
    if (existingLinks.length > 0) {
      existingLinks.forEach(link => {
        (link as HTMLLinkElement).href = dataUrl;
        (link as HTMLLinkElement).type = 'image/svg+xml';
        // Remove sizes attribute so it applies everywhere
        link.removeAttribute('sizes');
      });
    } else {
      // Create and inject the new dynamic favicon if none existed
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.type = 'image/svg+xml';
      newLink.href = dataUrl;
      document.head.appendChild(newLink);
    }
  }, [activeTheme]);

  const handleThemeChange = (theme: ThemeName) => {
    setActiveTheme(theme);
    localStorage.setItem('bst-theme', theme);
    document.cookie = `bst-theme=${theme}; path=/; max-age=31536000`;
  };

  const handlePerfChange = (mode: 'always' | 'never') => {
    setPerfMode(mode);
    document.cookie = `bst-performance=${mode}; path=/; max-age=31536000`;
  };

  return {
    activeTheme,
    perfMode,
    handleThemeChange,
    handlePerfChange,
  };
}
