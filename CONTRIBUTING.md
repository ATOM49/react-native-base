# Contributing

## Getting started

```sh
nvm use            # Node version from .nvmrc
npm install
npx expo start     # then press i / a / w for iOS / Android / web
```

## Workflow

1. Branch from `main` (`feat/...`, `fix/...`, `chore/...`).
2. Make your change, keeping the checks green:
   ```sh
   npm run typecheck
   npm run lint
   npm run format:check
   npm run test:ci
   ```
3. Open a PR against `main` — CI runs the same checks. Fill in the PR template,
   including screenshots for UI changes.

## Conventions

- **Screens** are files in `src/app/` (Expo Router file-based routing).
- **Client state** (UI, session, preferences) → Zustand stores in `src/stores/`.
- **Server state** (anything fetched from an API) → TanStack Query hooks in `src/api/`.
- **Shared UI** → `src/components/`; prefer the `Themed*` primitives for colors.
- Use the `@/` import alias instead of relative `../../` paths.
- kebab-case filenames; colocate tests in `__tests__/` next to the code.

## Releases

- **OTA (JS-only) changes** ship automatically: merging to `main` publishes an
  EAS Update to the production channel.
- **Native changes** (new native module, SDK upgrade, app.json changes) need a
  store build: push a `v*` tag or run the "EAS Build" workflow manually.
