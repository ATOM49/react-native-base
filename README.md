# react-native-base

[![CI](https://github.com/atom49/react-native-base/actions/workflows/ci.yml/badge.svg)](https://github.com/atom49/react-native-base/actions/workflows/ci.yml)

A production-ready React Native **template repository**: Expo + Expo Router + Zustand + TanStack Query + EAS deployments, with CI, testing, and template automation wired up out of the box.

## Use this template

1. Click **Use this template → Create a new repository** on GitHub.
2. Push your first commit to `main` — the [template-cleanup workflow](.github/workflows/template-cleanup.yml) runs once and automatically renames the app, slug, URL scheme, and bundle identifiers after your new repo, resets this README, and deletes itself.
3. Follow the checklist it writes into your new README (link EAS, add secrets, etc.).

## What's inside

| Concern      | Choice                                                                                                            |
| ------------ | ----------------------------------------------------------------------------------------------------------------- |
| Framework    | [Expo SDK 57](https://docs.expo.dev/) (React Native 0.86, React 19, TypeScript strict)                            |
| Routing      | [Expo Router](https://docs.expo.dev/router/introduction/) — file-based, typed routes                              |
| UI library   | [gluestack-ui v2](https://gluestack.io/ui/docs) on [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS v3) |
| Client state | [Zustand](https://zustand.docs.pmnd.rs/) (+ AsyncStorage persistence example)                                     |
| Server state | [TanStack Query](https://tanstack.com/query/latest) (app-focus refetch + offline handling)                        |
| Builds & OTA | [EAS Build / Submit / Update](https://docs.expo.dev/eas/) via GitHub Actions                                      |
| Testing      | Jest (`jest-expo`) + React Native Testing Library                                                                 |
| Quality      | ESLint (`eslint-config-expo`), Prettier, `tsc --noEmit`, CI on every PR                                           |
| Repo hygiene | Issue forms, PR template, CODEOWNERS, Dependabot, SECURITY.md                                                     |

## Getting started

### Prerequisites

- Node 22 (see `.nvmrc`) — `nvm use`
- [EAS CLI](https://docs.expo.dev/eas/) for builds/updates — `npm i -g eas-cli`
- Xcode (iOS) and/or Android Studio (Android) if you want to run on
  simulators/emulators. Not required for Expo Go or web.

### Install & run

```sh
nvm use
npm install
cp .env.example .env
npx expo start   # press i / a / w for iOS / Android / web
```

### Verify the setup

```sh
npm run typecheck
npm run lint
npm run format:check
npm run test:ci
```

All four should pass cleanly on a fresh `npm install` — this is exactly what
CI runs on every PR (see [CI](.github/workflows/ci.yml)). If `npm install`
reports vulnerabilities, check `npm audit` before acting on it: most flagged
issues live in Expo's own build tooling (transitive `uuid` deps in
`@expo/config-plugins` etc.), not runtime app code, and `npm audit fix
--force` will downgrade Expo to an incompatible major version — don't run it
here.

## Project structure

```
src/
  app/                # Screens & navigation (Expo Router file-based routes)
    _layout.tsx       #   Root layout: providers (Query, theme) + root stack
    (tabs)/           #   Bottom-tab group (Home, Settings)
    +not-found.tsx    #   404 route
  api/                # Server state: fetch client + TanStack Query hooks
  stores/             # Client state: Zustand stores (plain + persisted examples)
  components/ui/      # gluestack-ui components (box, stack, text, button, provider)
  constants/          # Color strings for React Navigation chrome (tab bar, etc.)
  hooks/              # Shared hooks (color scheme, theme)
  lib/                # App-wide singletons (query client)
  global.css          # NativeWind/Tailwind entrypoint
```

**Conventions:** import via the `@/` alias; screens live in `src/app/`; server data goes in TanStack Query hooks (`src/api/`), never in Zustand; `EXPO_PUBLIC_*` env vars are public — keep secrets out of them.

## Styling & UI

The UI layer is [gluestack-ui v2](https://gluestack.io/ui/docs) on
[NativeWind v4](https://www.nativewind.dev/) — you style with Tailwind
`className`s, not `StyleSheet`:

```tsx
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';

<VStack space="md" className="flex-1 bg-background p-4">
  <Button action="primary" onPress={onPress}>
    <ButtonText>Continue</ButtonText>
  </Button>
</VStack>;
```

Colors are semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, …)
defined per light/dark scheme in
`src/components/ui/gluestack-ui-provider/config.ts` and mapped to Tailwind in
`tailwind.config.js` — so they adapt to the color scheme automatically. This
template ships a starter set of components (box, hstack, vstack, text, heading,
button). Add more with the gluestack CLI (vendors source into
`src/components/ui/`):

```sh
npx gluestack-ui@2 add input select modal   # interactive; needs a TTY + network
```

See [`AGENTS.md`](AGENTS.md) for the full UI conventions (tokens, adding
components, the provider). **Static checks (`typecheck`/`lint`/`test`) don't
exercise Metro bundling or on-device rendering** — after changing styling or the
NativeWind/Tailwind config, run `npx expo start` once and load the app to
confirm classes actually render on device.

## Scripts

| Script                                  | Purpose                                                        |
| --------------------------------------- | -------------------------------------------------------------- |
| `npm start` / `ios` / `android` / `web` | Run the dev server                                             |
| `npm run typecheck`                     | TypeScript, no emit                                            |
| `npm run lint`                          | ESLint via `expo lint`                                         |
| `npm run format` / `format:check`       | Prettier write / verify                                        |
| `npm test` / `test:ci`                  | Jest watch mode / CI mode with coverage                        |
| `npm run prebuild`                      | Generate native projects (usually unnecessary — EAS does this) |

## Deployments

Three workflows in [`.github/workflows/`](.github/workflows):

- **[CI](.github/workflows/ci.yml)** — lint, format check, typecheck, tests on every PR and push to `main`.
- **[EAS Update](.github/workflows/eas-update.yml)** — every push to `main` ships an over-the-air JS update to installed builds (no store review needed).
- **[EAS Build](.github/workflows/eas-build.yml)** — native builds: run manually from the Actions tab (choose platform/profile), or push a `v*` tag for a production build; optionally submits to the app stores.

Release model: JS-only changes ride OTA updates from `main`; native changes (new native modules, SDK upgrades, `app.json` changes) need a new store build via tag or manual dispatch. `runtimeVersion` uses the `appVersion` policy so OTA updates only reach compatible binaries.

### One-time EAS setup (after creating your repo)

1. `npm i -g eas-cli && eas login`
2. `eas init` — links the project and writes `extra.eas.projectId` into `app.json`
3. `eas update:configure` — enables OTA updates (adds the `updates.url` field to `app.json`)
4. **Commit and push the `app.json` changes from steps 2–3** — the EAS Build
   and EAS Update GitHub Actions workflows read `extra.eas.projectId` from the
   committed `app.json`, so builds/updates triggered from CI will fail (or
   target the wrong project) until this is pushed.
5. Create an [Expo access token](https://expo.dev/settings/access-tokens) and add it as the `EXPO_TOKEN` repository secret (**Settings → Secrets and variables → Actions**)
6. For store submission: configure credentials with `eas credentials` and the `submit` profile in [`eas.json`](eas.json)

### Environment variables

Copy `.env.example` → `.env` for local dev. `EXPO_PUBLIC_*` values are inlined into the client bundle at build time; for build-time secrets use [EAS environment variables](https://docs.expo.dev/eas/environment-variables/).

## Maintaining the template itself

- Keep this repo marked as a **Template repository** (Settings → General → check "Template repository").
- Dependabot updates actions and JS deps weekly; Expo-coupled packages are excluded — upgrade SDKs with `npx expo install expo@latest --fix` followed by `npx expo-doctor`.
- Recommended branch protection on `main`: require the CI check and one review.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Security reports: [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE)
