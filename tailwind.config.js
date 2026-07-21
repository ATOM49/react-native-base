/** @type {import('tailwindcss').Config} */
// NativeWind + gluestack-ui. Color tokens resolve to CSS variables defined per
// color scheme in `src/components/ui/gluestack-ui-provider/config.ts`, so the
// same class (e.g. `bg-background`, `text-primary`) adapts to light/dark.
// The plugin is published as an ESM default export; normalize across the
// possible interop shapes so this works whether Tailwind loads the config via
// jiti or Node require.
const gluestackPluginModule = require('@gluestack-ui/nativewind-utils/tailwind-plugin');
const gluestackPlugin = gluestackPluginModule.default ?? gluestackPluginModule;

const withOpacity = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: withOpacity('--color-background'),
        foreground: withOpacity('--color-foreground'),
        card: withOpacity('--color-card'),
        border: withOpacity('--color-border'),
        primary: {
          DEFAULT: withOpacity('--color-primary'),
          foreground: withOpacity('--color-primary-foreground'),
        },
        secondary: {
          DEFAULT: withOpacity('--color-secondary'),
          foreground: withOpacity('--color-secondary-foreground'),
        },
        muted: {
          DEFAULT: withOpacity('--color-muted'),
          foreground: withOpacity('--color-muted-foreground'),
        },
        destructive: {
          DEFAULT: withOpacity('--color-destructive'),
          foreground: withOpacity('--color-destructive-foreground'),
        },
      },
    },
  },
  plugins: [gluestackPlugin],
};
