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
      applyColorScheme(savedScheme);
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
