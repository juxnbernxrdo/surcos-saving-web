'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  highContrast: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  toggleHighContrast: () => void;
  formatCurrency: (amount: number) => string;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'system',
  resolvedTheme: 'light',
  highContrast: false,
  setThemeMode: () => {},
  toggleTheme: () => {},
  toggleHighContrast: () => {},
  formatCurrency: (amt) => `$${amt.toFixed(2)}`,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [highContrast, setHighContrast] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('surcos_theme') as ThemeMode) || 'system';
    const savedHC = localStorage.getItem('surcos_high_contrast') === 'true';
    setThemeModeState(savedTheme);
    setHighContrast(savedHC);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const initialResolved: 'light' | 'dark' =
      savedTheme === 'dark'
        ? 'dark'
        : savedTheme === 'light'
        ? 'light'
        : mediaQuery.matches
        ? 'dark'
        : 'light';
    setResolvedTheme(initialResolved);

    const root = document.documentElement;
    if (initialResolved === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    requestAnimationFrame(() => {
      root.classList.remove('no-transitions');
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const computeTheme = () => {
      if (themeMode === 'system') {
        return mediaQuery.matches ? 'dark' : 'light';
      }
      return themeMode;
    };

    const active = computeTheme();
    setResolvedTheme(active);

    const root = document.documentElement;
    if (active === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    const handler = () => {
      if (themeMode === 'system') {
        const nextTheme = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(nextTheme);
        if (nextTheme === 'dark') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.remove('dark');
          root.classList.add('light');
        }
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [themeMode, highContrast, mounted]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('surcos_theme', mode);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: 'light' | 'dark' = resolvedTheme === 'dark' ? 'light' : 'dark';
    setThemeMode(nextTheme);
  }, [resolvedTheme, setThemeMode]);

  const toggleHighContrast = useCallback(() => {
    setHighContrast((prev) => {
      const next = !prev;
      localStorage.setItem('surcos_high_contrast', String(next));
      return next;
    });
  }, []);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }, []);

  const value = useMemo(
    () => ({
      themeMode,
      resolvedTheme,
      highContrast,
      setThemeMode,
      toggleTheme,
      toggleHighContrast,
      formatCurrency,
    }),
    [themeMode, resolvedTheme, highContrast, setThemeMode, toggleTheme, toggleHighContrast, formatCurrency]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
