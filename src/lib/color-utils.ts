export interface ColorScheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
}

export const defaultColorSchemes: ColorScheme[] = [
  {
    name: 'Rustic Green',
    colors: {
      primary: 'oklch(0.85 0.08 145)',
      secondary: 'oklch(0.72 0.06 140)',
      accent: 'oklch(0.80 0.06 142)',
      background: 'oklch(0.97 0.02 85)',
      foreground: 'oklch(0.72 0.06 140)',
      muted: 'oklch(0.90 0.04 145)',
      border: 'oklch(0.88 0.04 145)',
    },
  },
  {
    name: 'Warm Brown',
    colors: {
      primary: 'oklch(0.75 0.08 45)',
      secondary: 'oklch(0.65 0.06 40)',
      accent: 'oklch(0.70 0.06 42)',
      background: 'oklch(0.97 0.02 45)',
      foreground: 'oklch(0.65 0.06 40)',
      muted: 'oklch(0.90 0.04 45)',
      border: 'oklch(0.88 0.04 45)',
    },
  },
  {
    name: 'Ocean Blue',
    colors: {
      primary: 'oklch(0.75 0.12 220)',
      secondary: 'oklch(0.65 0.08 215)',
      accent: 'oklch(0.70 0.10 225)',
      background: 'oklch(0.97 0.02 220)',
      foreground: 'oklch(0.65 0.08 215)',
      muted: 'oklch(0.90 0.04 220)',
      border: 'oklch(0.88 0.04 220)',
    },
  },
  {
    name: 'Sunset Orange',
    colors: {
      primary: 'oklch(0.75 0.15 35)',
      secondary: 'oklch(0.65 0.12 30)',
      accent: 'oklch(0.70 0.13 40)',
      background: 'oklch(0.97 0.02 35)',
      foreground: 'oklch(0.65 0.12 30)',
      muted: 'oklch(0.90 0.04 35)',
      border: 'oklch(0.88 0.04 35)',
    },
  },
  {
    name: 'Purple Lavender',
    colors: {
      primary: 'oklch(0.75 0.12 300)',
      secondary: 'oklch(0.65 0.08 295)',
      accent: 'oklch(0.70 0.10 305)',
      background: 'oklch(0.97 0.02 300)',
      foreground: 'oklch(0.65 0.08 295)',
      muted: 'oklch(0.90 0.04 300)',
      border: 'oklch(0.88 0.04 300)',
    },
  },
  {
    name: 'Forest Green',
    colors: {
      primary: 'oklch(0.65 0.12 155)',
      secondary: 'oklch(0.55 0.08 150)',
      accent: 'oklch(0.60 0.10 160)',
      background: 'oklch(0.97 0.02 155)',
      foreground: 'oklch(0.55 0.08 150)',
      muted: 'oklch(0.90 0.04 155)',
      border: 'oklch(0.88 0.04 155)',
    },
  },
];

export function applyColorScheme(scheme: ColorScheme): void {
  const root = document.documentElement;
  
  // Apply light mode colors
  root.style.setProperty('--primary', scheme.colors.primary);
  root.style.setProperty('--secondary', scheme.colors.secondary);
  root.style.setProperty('--accent', scheme.colors.accent);
  root.style.setProperty('--background', scheme.colors.background);
  root.style.setProperty('--foreground', scheme.colors.foreground);
  root.style.setProperty('--muted', scheme.colors.muted);
  root.style.setProperty('--border', scheme.colors.border);
  
  // Update related colors
  root.style.setProperty('--primary-foreground', scheme.colors.background);
  root.style.setProperty('--secondary-foreground', 'oklch(0.95 0.02 85)');
  root.style.setProperty('--accent-foreground', 'oklch(0.95 0.02 85)');
  root.style.setProperty('--muted-foreground', adjustLightness(scheme.colors.foreground, -0.1));
  root.style.setProperty('--card', adjustLightness(scheme.colors.background, 0.01));
  root.style.setProperty('--card-foreground', scheme.colors.foreground);
  root.style.setProperty('--popover', adjustLightness(scheme.colors.background, 0.01));
  root.style.setProperty('--popover-foreground', scheme.colors.foreground);
  root.style.setProperty('--input', adjustLightness(scheme.colors.muted, -0.02));
  root.style.setProperty('--ring', scheme.colors.primary);
  
  // Chart colors
  root.style.setProperty('--chart-1', scheme.colors.primary);
  root.style.setProperty('--chart-2', scheme.colors.secondary);
  root.style.setProperty('--chart-3', scheme.colors.accent);
  root.style.setProperty('--chart-4', adjustLightness(scheme.colors.secondary, -0.1));
  root.style.setProperty('--chart-5', adjustLightness(scheme.colors.muted, 0.05));
}

export function adjustLightness(oklchColor: string, adjustment: number): string {
  // Extract lightness value from oklch color
  const match = oklchColor.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/);
  if (!match) return oklchColor;
  
  const lightness = parseFloat(match[1]);
  const chroma = match[2];
  const hue = match[3];
  
  const newLightness = Math.max(0, Math.min(1, lightness + adjustment));
  return `oklch(${newLightness} ${chroma} ${hue})`;
}

export function saveColorScheme(scheme: ColorScheme): void {
  localStorage.setItem('rustic-color-scheme', JSON.stringify(scheme));
}

export function loadColorScheme(): ColorScheme | null {
  try {
    const saved = localStorage.getItem('rustic-color-scheme');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function hexToOklch(hex: string): string {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // Convert RGB to linear RGB
  const toLinear = (c: number) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const rLin = toLinear(r);
  const gLin = toLinear(g);
  const bLin = toLinear(b);

  // Simple approximation for OKLCH conversion
  // In production, you'd use a proper color space conversion library
  const lightness = Math.sqrt(0.299 * rLin + 0.587 * gLin + 0.114 * bLin);
  const chroma = Math.sqrt(Math.pow(r - lightness, 2) + Math.pow(g - lightness, 2) + Math.pow(b - lightness, 2)) * 0.4;

  // Calculate hue in HSL space for better approximation
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;
  if (delta > 0) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  return `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(0)})`;
}

export function oklchToHex(oklch: string): string {
  // This is a simplified conversion - in production you'd use a proper color library
  const match = oklch.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/);
  if (!match) return '#000000';

  const lightness = parseFloat(match[1]);
  const chroma = parseFloat(match[2]);
  const hue = parseFloat(match[3]);

  // Simple approximation - convert back to RGB
  const hueRad = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(hueRad);
  const b = chroma * Math.sin(hueRad);

  // Approximate RGB values
  let r = lightness + a * 0.3;
  let g = lightness - a * 0.15 + b * 0.3;
  let bl = lightness - a * 0.15 - b * 0.3;

  // Clamp values
  r = Math.max(0, Math.min(1, r));
  g = Math.max(0, Math.min(1, g));
  bl = Math.max(0, Math.min(1, bl));

  // Convert to 8-bit values
  const rInt = Math.round(r * 255);
  const gInt = Math.round(g * 255);
  const bInt = Math.round(bl * 255);

  return `#${rInt.toString(16).padStart(2, '0')}${gInt.toString(16).padStart(2, '0')}${bInt.toString(16).padStart(2, '0')}`;
}

export function generateColorSchemeFromPrimary(primaryHex: string, schemeName: string = 'Custom'): ColorScheme {
  // Convert primary color to OKLCH
  const primaryOklch = hexToOklch(primaryHex);

  // Extract values from primary color
  const match = primaryOklch.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/);
  if (!match) {
    return defaultColorSchemes[0]; // fallback
  }

  const lightness = parseFloat(match[1]);
  const chroma = parseFloat(match[2]);
  const hue = parseFloat(match[3]);

  // Generate complementary colors
  const secondaryHue = (hue + 30) % 360; // Analogous color
  const accentHue = (hue + 60) % 360; // Triadic color

  return {
    name: schemeName,
    colors: {
      primary: primaryOklch,
      secondary: `oklch(${(lightness - 0.1).toFixed(3)} ${chroma.toFixed(3)} ${secondaryHue.toFixed(0)})`,
      accent: `oklch(${(lightness - 0.05).toFixed(3)} ${(chroma * 0.8).toFixed(3)} ${accentHue.toFixed(0)})`,
      background: `oklch(0.97 0.02 ${hue.toFixed(0)})`,
      foreground: `oklch(${(lightness - 0.2).toFixed(3)} ${(chroma * 0.7).toFixed(3)} ${hue.toFixed(0)})`,
      muted: `oklch(0.90 0.04 ${hue.toFixed(0)})`,
      border: `oklch(0.88 0.04 ${hue.toFixed(0)})`,
    },
  };
}
