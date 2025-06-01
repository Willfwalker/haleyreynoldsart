'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  ColorScheme, 
  defaultColorSchemes, 
  applyColorScheme, 
  saveColorScheme, 
  loadColorScheme 
} from '@/lib/color-utils';

export function useColorCustomizer() {
  const [currentScheme, setCurrentScheme] = useState<ColorScheme>(defaultColorSchemes[0]);
  const [isOpen, setIsOpen] = useState(false);

  // Load saved color scheme on mount
  useEffect(() => {
    const savedScheme = loadColorScheme();
    if (savedScheme) {
      setCurrentScheme(savedScheme);
      // Check if colors are hex values (start with #) or OKLCH
      const isHexColors = Object.values(savedScheme.colors).some(color =>
        typeof color === 'string' && color.startsWith('#')
      );

      if (isHexColors) {
        // Apply hex colors directly
        const root = document.documentElement;
        Object.entries(savedScheme.colors).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value);
        });

        // Update related colors for hex
        root.style.setProperty('--primary-foreground', savedScheme.colors.background);
        root.style.setProperty('--secondary-foreground', '#ffffff');
        root.style.setProperty('--accent-foreground', '#ffffff');
        root.style.setProperty('--muted-foreground', savedScheme.colors.foreground);
        root.style.setProperty('--card', savedScheme.colors.background);
        root.style.setProperty('--card-foreground', savedScheme.colors.foreground);
        root.style.setProperty('--popover', savedScheme.colors.background);
        root.style.setProperty('--popover-foreground', savedScheme.colors.foreground);
        root.style.setProperty('--input', savedScheme.colors.muted);
        root.style.setProperty('--ring', savedScheme.colors.primary);
      } else {
        // Apply OKLCH colors using the existing function
        applyColorScheme(savedScheme);
      }
    }
  }, []);

  const changeColorScheme = useCallback((scheme: ColorScheme) => {
    setCurrentScheme(scheme);
    applyColorScheme(scheme);
    saveColorScheme(scheme);
  }, []);

  const createCustomScheme = useCallback((name: string, colors: ColorScheme['colors']) => {
    const customScheme: ColorScheme = {
      name,
      colors,
    };
    changeColorScheme(customScheme);
  }, [changeColorScheme]);

  const resetToDefault = useCallback(() => {
    const defaultScheme = defaultColorSchemes[0];
    changeColorScheme(defaultScheme);
  }, [changeColorScheme]);

  const toggleCustomizer = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    currentScheme,
    isOpen,
    defaultColorSchemes,
    changeColorScheme,
    createCustomScheme,
    resetToDefault,
    toggleCustomizer,
    setIsOpen,
  };
}
