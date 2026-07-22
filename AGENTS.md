# Agent guidelines

Guidance for AI coding agents (and new contributors) working in this repo.

## Stack

- Expo SDK 57 / React Native 0.86 / React 19 / TypeScript (strict). Read the
  versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing code.
- Routing: [Expo Router](https://docs.expo.dev/router/introduction/) — file-based routes in `src/app/`.
- UI library: [gluestack-ui v2](https://gluestack.io/ui/docs) on
  [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS v3). Components in `src/components/ui/`.
- Client state: [Zustand](https://zustand.docs.pmnd.rs/) stores in `src/stores/`.
- Server state: [TanStack Query](https://tanstack.com/query/latest) hooks in `src/api/`.
- Deployments: EAS Build / Submit / Update, driven by GitHub Actions in `.github/workflows/`.

## Conventions

- Use the `@/*` path alias (maps to `src/*`).
- New screens are files in `src/app/`; shared UI goes in `src/components/`.
- Never mix server state into Zustand — data fetched from an API belongs in a
  TanStack Query hook; UI/session state belongs in a store.
- `EXPO_PUBLIC_*` env vars are inlined into the client bundle; never put secrets in them.
- kebab-case filenames; components exported as named PascalCase functions.

## UI: gluestack-ui + NativeWind

**Style with Tailwind `className`, not `StyleSheet`.** NativeWind compiles
Tailwind classes to React Native styles. Prefer the gluestack primitives in
`src/components/ui/` over raw RN components:

```tsx
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';

<VStack space="md" className="flex-1 bg-background p-4">
  <Heading size="md">Title</Heading>
  <Text muted>Subtitle</Text>
  <Button action="primary" onPress={onPress}>
    <ButtonText>Continue</ButtonText>
  </Button>
</VStack>;
```

- **Colors are semantic tokens, not raw hex.** Use `bg-background`,
  `text-foreground`, `text-muted-foreground`, `bg-primary`,
  `text-primary-foreground`, `bg-secondary`, `bg-destructive`, `border-border`,
  etc. These are defined per color scheme in
  `src/components/ui/gluestack-ui-provider/config.ts` and mapped to Tailwind in
  `tailwind.config.js`, so they adapt to light/dark automatically. Add a new
  token in both files; don't hardcode `#hex` in components.
- **Adding more components:** this template ships a small set (box, hstack,
  vstack, text, heading, button) plus the provider. Add richer gluestack
  components (input, modal, select, …) with the CLI, which vendors the source
  into `src/components/ui/`:
  ```sh
  npx gluestack-ui@2 add input   # runs interactively; needs a TTY + network
  ```
  If you can't run the CLI, hand-write the component in `src/components/ui/<name>/`
  following the existing files: a `tva(...)` style block for variants, and
  `withStyleContext` / `useStyleContext` (from `@gluestack-ui/nativewind-utils`)
  when child parts (e.g. `ButtonText`) need the parent's variant.
- **Provider:** `GluestackUIProvider` wraps the app in `src/app/_layout.tsx` and
  hosts the overlay/toast portals. `src/app/_layout.tsx` also imports
  `@/global.css` — keep that import; it's what loads Tailwind.
- **Reanimated:** `babel-preset-expo` auto-adds the worklets plugin; do not add
  `react-native-worklets/plugin` to `babel.config.js` manually (it would double-apply).
- `src/constants/theme.ts` + `useTheme()` remain **only** for React Navigation
  chrome (e.g. the tab bar tint), which needs plain color strings. Everything
  else uses gluestack tokens.

## Key files

| File                                                | Purpose                                         |
| --------------------------------------------------- | ----------------------------------------------- |
| `babel.config.js`                                   | NativeWind `jsxImportSource` + preset           |
| `metro.config.js`                                   | `withNativeWind`, points at `src/global.css`    |
| `tailwind.config.js`                                | Token→CSS-var color mapping + gluestack plugin  |
| `src/global.css`                                    | Tailwind directives (the NativeWind entrypoint) |
| `src/components/ui/gluestack-ui-provider/config.ts` | Light/dark design tokens                        |

## Verify changes

```sh
npm run typecheck   # tsc --noEmit
npm run lint        # expo lint (ESLint)
npm run format:check
npm run test:ci     # jest
```

All four must pass — CI runs the same commands. Static checks do **not**
exercise Metro bundling or on-device NativeWind rendering: after changing
styling/config, also run `npx expo start` once and load the app to confirm
classes actually render.
