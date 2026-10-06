# Agent guidelines

Guidance for AI coding agents (and new contributors) working in this repo.

## Stack

- Expo SDK 57 / React Native 0.86 / React 19.2 / TypeScript (strict) / Node 24 LTS.
  Read the versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing code.
- New Architecture only, React Compiler on, typed routes on, Continuous Native
  Generation (`ios/` and `android/` are generated, never committed).
- Develop in a **development build** (`expo-dev-client`, `eas build --profile development`);
  Expo Go can't load custom native modules.
- Routing: [Expo Router](https://docs.expo.dev/router/introduction/) — file-based routes in `src/app/`.
- UI library: [gluestack-ui v3](https://gluestack.io/ui/docs) on
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
- **Keep screens thin.** Business rules, data shaping and request logic go in
  plain TypeScript modules (`src/api/`, `src/stores/`, or a UI-free module under
  `src/lib/`) that Jest can test in milliseconds without a simulator. A screen
  should mostly wire hooks to components. See `src/api/__tests__/client.test.ts`
  and `src/stores/__tests__/counter-store.test.ts` for the pattern.
- **Every interactive element has an accessible name.** Give controls without
  visible text inside them (`Switch`, icon buttons, …) an `accessibilityLabel`.
  Screen readers, React Native Testing Library's `getByRole`/`getByLabelText`,
  and accessibility-tree device tools all rely on it.

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
  npx gluestack-ui@3 add input   # runs interactively; needs a TTY + network
  ```
  If you can't run the CLI, hand-write the component in `src/components/ui/<name>/`
  following the existing files: a `tva(...)` style block for variants, and
  `withStyleContext` / `useStyleContext` (from `@gluestack-ui/utils/nativewind-utils`)
  when child parts (e.g. `ButtonText`) need the parent's variant. Behavioural
  primitives (overlay, toast, `createButton`, …) come from
  `@gluestack-ui/core/<component>/creator`. The v2 per-component packages
  (`@gluestack-ui/button`, `@gluestack-ui/overlay`, `@gluestack-ui/nativewind-utils`, …)
  are deprecated — don't add them back.
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
| `eas.json`                                          | Build profiles + EAS Update channels            |
| `.github/dependabot.yml`                            | Which deps may auto-update (coupled sets don't) |
| `src/global.css`                                    | Tailwind directives (the NativeWind entrypoint) |
| `src/components/ui/gluestack-ui-provider/config.ts` | Light/dark design tokens                        |

## Verify changes

```sh
npm run verify      # runs all four below, stops at the first failure
npm run typecheck   # tsc --noEmit
npm run lint        # expo lint (ESLint)
npm run format:check
npm run test:ci     # jest
```

All four must pass — CI runs the same commands. Static checks do **not**
exercise Metro bundling or on-device NativeWind rendering: after changing
styling/config, also run `npx expo start` once and load the app to confirm
classes actually render.

## Working with coding agents

This file is the agent's version-pinned context: it names the SDK, the docs for
that exact version, and the patterns to follow. Models trained on older React
Native code tend to produce outdated patterns (class lifecycles, the old Bridge,
hand-written native module boilerplate, React Navigation config instead of
Expo Router). This template is New Architecture only, so treat any of those as
a bug. Keep this file accurate; a stale AGENTS.md is worse than none.

How changes should be made:

1. **Follow the existing vertical slice.** Before adding a feature, read the
   slice it resembles (route in `src/app/` → hook in `src/api/` or store in
   `src/stores/` → gluestack UI → colocated `__tests__/`) and copy its shape.
   New files tend to copy their neighbours, so an inconsistent pattern spreads
   fast. If a pattern needs to change, change it once, deliberately, and
   update this file in the same PR.
2. **Small, checkable steps over one large change.** Split big features or
   migrations into screen-by-screen or module-by-module PRs that each pass
   `npm run verify`.
3. **Fast checks first, device checks second.** Prove logic with Jest (no
   simulator). Use a device or simulator only for what needs one: layout,
   NativeWind rendering, gestures and native modules.
4. **Device feedback for agents.** For on-device checks an agent can drive:
   - the Expo MCP server (setup: [docs.expo.dev/agents](https://docs.expo.dev/agents);
     needs an Expo account) for the project's SDK and config, docs
     lookup, and simulator screenshots from the running dev server;
   - [agent-device](https://oss.callstack.com/agent-device/) (Callstack) to
     drive the app via accessibility snapshots, and to save an exploratory run
     as a replayable check that runs without AI. Good accessibility labels
     (see **Conventions**) make both work better.
5. **Independent review.** Agent-written PRs get a human review (CODEOWNERS)
   and, where available, a separate review pass. Don't merge on the authoring
   agent's own say-so.

## Keeping the template current

This repo is a **base template**: every app generated from it starts with
whatever versions and patterns are here. Keeping it current is part of every
task, not a separate chore. When you work here, act like the template's
maintainer: if you notice something stale, fix it (or flag it in your summary
if it's out of scope).

### Policy

- **Expo SDK: newest stable, latest patch.** Check with `npm view expo dist-tags`
  (`latest` = stable, `next` = beta). Always run the latest patch of the current
  SDK — patches carry critical fixes (e.g. `expo@57.0.9` fixed a Hermes memory
  regression for apps using Reanimated). Adopt a new SDK once it's stable, not
  during its beta.
- **Expo-coupled packages take exactly the versions the SDK specifies.** Use
  `npx expo install <pkg>` / `npx expo install --check`, never hand-picked
  versions. If the Expo API is unreachable (offline/sandboxed), read
  `node_modules/expo/bundledNativeModules.json` for the same data. Keep Expo's
  pin style (exact for `react-native`, `react-native-reanimated`,
  `react-native-worklets`, `nativewind`; `~` for `expo-*`).
- **Coupled sets move together, never one package at a time** — see the table
  below. `.github/dependabot.yml` encodes these exclusions; update it when the
  sets change.
- **Everything else: latest minor/patch freely; majors when the coupled set
  allows** (check peer deps with `npm view <pkg>@<ver> peerDependencies`).
- **Node:** `.nvmrc` tracks the current Active LTS.
- **GitHub Actions:** latest major of each action (`git ls-remote --tags <repo>`);
  check the action's inputs didn't change across the major.
- **Prefer platform defaults over custom setup.** When Expo/RN adds a
  first-party way to do something the template does by hand, switch to it.
  Don't add libraries that duplicate something already in the stack.
- **Docs move with code.** Any version or pattern change updates this file, the
  README stack table, and the versioned docs link above in the same commit.

Coupled sets:

| Set                                                                           | Driven by                                                   |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `react`, `react-native`, `expo-*`, Reanimated/Worklets/Screens/RNGH/SVG, etc. | Expo SDK (`bundledNativeModules.json`)                      |
| `jest` major, `@react-native/jest-preset`                                     | `jest-expo`                                                 |
| `eslint` major                                                                | `eslint-config-expo`                                        |
| `@gluestack-ui/*` ↔ `nativewind` ↔ `tailwindcss` majors                       | NativeWind (gluestack v5 needs NativeWind v5 / Tailwind v4) |

### Freshness check (start of any non-trivial task)

```sh
npm view expo dist-tags          # is there a newer stable SDK / patch?
npx expo install --check         # Expo-coupled packages aligned?
npm outdated                     # everything else
```

### SDK upgrade checklist

1. Read `https://expo.dev/changelog/sdk-<N>` and the React Native release notes
   for the bundled RN version. Note deprecations and new defaults.
2. `npx expo install expo@^<N>.0.0 --fix`, then `npx expo-doctor@latest`.
3. Re-align the non-Expo coupled sets above (jest-expo → jest, eslint-config-expo
   → eslint, NativeWind/gluestack).
4. Adopt new defaults/deprecations from step 1 in config and sample code.
5. Update version numbers in this file (Stack, docs link, watchlist below)
   and in the README.
6. Verify: the four checks in **Verify changes**, `npx expo-doctor@latest`,
   `npx expo export --platform android` (proves Metro bundles), and
   `npx expo start` on a device/simulator. Native changes need a new dev build.

### Upgrade watchlist

Review these whenever you touch dependencies; update the table as items land.
_Last reviewed: 2026-10-06._

| Item                                       | Status                                                             | Action                                                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Expo SDK 58 (RN 0.88)                      | Beta since 2026-09-15 (`expo@next`)                                | Upgrade once stable. Brings iOS 27 scene life cycle by default, `@expo/agent-cli`.                           |
| iOS 27 / Xcode 27                          | Apps built with the iOS 27 SDK must use the scene-based life cycle | On SDK 57 opt in via `expo-build-properties` `ios.enableSceneSupport` (`expo@>=57.0.23`), or move to SDK 58. |
| NativeWind v5 / Tailwind v4 / gluestack v5 | NativeWind v5 is RC; gluestack v5 is stable but requires it        | Migrate all three together once NativeWind v5 is stable.                                                     |
| Jest 30                                    | `jest-expo@57` still depends on Jest 29                            | Wait for `jest-expo` to move.                                                                                |
| TypeScript 7 / ESLint 10                   | Released upstream                                                  | Adopt when Expo's tooling (`expo/tsconfig.base`, `eslint-config-expo`) supports them.                        |
| AsyncStorage v3                            | SDK 57 bundles 2.2.0                                               | Follow the SDK.                                                                                              |
