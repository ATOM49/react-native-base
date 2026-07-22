import { vars } from 'nativewind';

/**
 * Design tokens exposed as CSS variables per color scheme. Tailwind color
 * utilities (`bg-background`, `text-primary`, …) resolve to these via
 * `tailwind.config.js`, so components restyle automatically in light/dark.
 * Values are space-separated RGB channels so Tailwind's `<alpha-value>` works.
 */
export const config = {
  light: vars({
    '--color-background': '255 255 255',
    '--color-foreground': '10 10 10',
    '--color-card': '255 255 255',
    '--color-border': '229 229 229',
    '--color-primary': '23 23 23',
    '--color-primary-foreground': '250 250 250',
    '--color-secondary': '245 245 245',
    '--color-secondary-foreground': '23 23 23',
    '--color-muted': '245 245 245',
    '--color-muted-foreground': '115 115 115',
    '--color-destructive': '220 38 38',
    '--color-destructive-foreground': '250 250 250',
  }),
  dark: vars({
    '--color-background': '10 10 10',
    '--color-foreground': '250 250 250',
    '--color-card': '23 23 23',
    '--color-border': '46 46 46',
    '--color-primary': '250 250 250',
    '--color-primary-foreground': '23 23 23',
    '--color-secondary': '38 38 38',
    '--color-secondary-foreground': '250 250 250',
    '--color-muted': '38 38 38',
    '--color-muted-foreground': '161 161 161',
    '--color-destructive': '248 113 113',
    '--color-destructive-foreground': '23 23 23',
  }),
};
