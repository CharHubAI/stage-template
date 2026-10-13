# Copilot instructions for this repository

## Project overview
This repo is a Chub stage template: a small React + TypeScript library that defines a custom interactive "stage" for Chub chat experiences. The implementation is intentionally lightweight and centered around the `Stage` class.

The main architecture is:
- `src/Stage.tsx`: the stage implementation. This is the main place to add behavior, UI, and state management.
- `src/App.tsx`: chooses between the local dev harness and the production Chub runner.
- `src/TestRunner.tsx`: local manual QA harness used while developing outside a live chat.
- `src/index.ts`: the library entry point exported from the build.
- `vite.config.ts`: builds the package as a library bundle into `dist`.
- `public/chub_meta.yaml` and `public/scenario.yaml`: metadata consumed by the stage runtime.

## Build, lint, and validation commands
This project uses Node 21.7.1 and Yarn.

- Install dependencies: `yarn install`
- Start the dev/test runner: `yarn dev`
- Build the library bundle: `yarn build`
- Lint the project: `yarn lint`
- Lint a single file (useful when iterating on one area): `npx eslint src/Stage.tsx`

There is no dedicated automated test suite in this repo. Validate changes primarily with `yarn build` and targeted linting for touched files (for example, `npx eslint src/Stage.tsx src/TestRunner.tsx`).

## Key conventions and patterns
- Treat `src/Stage.tsx` as the primary extension point. The stage lifecycle methods are `load()`, `setState()`, `beforePrompt()`, `afterResponse()`, and `render()`.
- Keep app bootstrapping logic in `src/App.tsx` and `src/main.tsx`; avoid reworking the surrounding framework unless the task requires it.
- Use `src/TestRunner.tsx` to exercise and debug local behavior before expecting it to work in the live Chub environment.
- Keep ephemeral runtime state in the stage instance (`myInternalState`-style fields) and only persist state that should survive across message boundaries via the stage state types.
- For changes that affect the stage contract, keep the stage data model and returned payloads consistent with the `@chub-ai/stages-ts` API.
- This is a library build, not a typical application: build output goes to `dist`, and the repo expects Vite to bundle the exported stage.

## Notes from the project docs
The project README describes this as a template for building stages that add functionality such as game UIs, stat blocks, expression packs, or custom prompt handling. It also notes that a local stage test harness is expected to run in development and that `src/TestRunner.tsx` is the place to adjust manual checks.
