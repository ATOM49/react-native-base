# Agent guidelines

Guidance for AI coding agents (and new contributors) working in this repo.

## Stack

- Expo SDK 57 / React Native 0.86 / React 19 / TypeScript (strict). Read the
  versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing code.
- Routing: [Expo Router](https://docs.expo.dev/router/introduction/) — file-based routes in `src/app/`.
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

## Verify changes

```sh
npm run typecheck   # tsc --noEmit
npm run lint        # expo lint (ESLint)
npm run format:check
npm run test:ci     # jest
```

All four must pass — CI runs the same commands.
