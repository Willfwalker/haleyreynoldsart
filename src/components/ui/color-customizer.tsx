'use client';

import { useState } from 'react';
import { Palette, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useColorCustomizer } from '@/hooks/useColorCustomizer';
import { hexToOklch } from '@/lib/color-utils';

export default function ColorCustomizer() {
  const {
    isOpen,
    createCustomScheme,
    resetToDefault,
    toggleCustomizer,
    setIsOpen,
  } = useColorCustomizer();

  const [customColors, setCustomColors] = useState({
    primary: '#A8dcab',
    secondary: '#8cb88e',
    accent: '#9dd4a0',
    background: '#fefefe',
    foreground: '#4a5d4f',
    muted: '#e8f5ea',
    border: '#d1e7d4',
  });

  const handleCustomColorChange = (colorKey: string, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: value,
    }));
  };

  const applyCustomColors = () => {
    const oklchColors = {
      primary: hexToOklch(customColors.primary),
      secondary: hexToOklch(customColors.secondary),
      accent: hexToOklch(customColors.accent),
      background: hexToOklch(customColors.background),
      foreground: hexToOklch(customColors.foreground),
      muted: hexToOklch(customColors.muted),
      border: hexToOklch(customColors.border),
    };

    createCustomScheme('Custom', oklchColors);
  };

  return (
    <>
      {/* Floating Color Customizer Button */}
      <Button
        onClick={toggleCustomizer}
        className="color-customizer-button"
        size="icon"
        aria-label="Customize Colors"
      >
        <Palette className="h-6 w-6" />
      </Button>

      {/* Color Customizer Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Customize Colors
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-3">
              {Object.entries(customColors).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3">
                  <Label htmlFor={key} className="w-20 text-sm capitalize">
                    {key}
                  </Label>
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      id={key}
                      type="color"
                      value={value}
                      onChange={(e) => handleCustomColorChange(key, e.target.value)}
                      className="w-12 h-8 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={value}
                      onChange={(e) => handleCustomColorChange(key, e.target.value)}
                      className="flex-1 text-xs"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={applyCustomColors}
                className="flex-1"
                size="sm"
              >
                Apply Custom Colors
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetToDefault}
                className="flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
