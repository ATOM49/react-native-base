/** @type {import('tailwindcss').Config} */
// NativeWind + gluestack-ui. Color tokens resolve to CSS variables defined per
// color scheme in `src/components/ui/gluestack-ui-provider/config.ts`, so the
// same class (e.g. `bg-background`, `text-primary`) adapts to light/dark.
// gluestack's Tailwind plugin adds the `data-[state=value]:` variants (e.g.
// `data-[pressed=true]:bg-primary/90`) that CLI-added components rely on.
// @gluestack-ui/utils (v3) ships it as ESM and only exposes it through its
// React Native barrel, so load the file directly; Tailwind's config loader
// (jiti) transpiles it.
const path = require('path');
const gluestackPluginModule = require(
  path.join(
    path.dirname(require.resolve('@gluestack-ui/utils/nativewind-utils')),
    'tailwind-plugin'
  )
);
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
