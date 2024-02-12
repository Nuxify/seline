# Seline

SvelteKit template for building modern and blazing fast webapps. Flowbite/Tailwind included.

> Demo: https://seline.pages.dev/

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
# sync svelte with tsconfig
npm run check

npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# check lint
npm run lint

# format linter
npm run format
```

## Running Tests

- TODO: More test cases for unit and integration tests

```bash
# run unit and integration/e2e tests with vitest and playwright
npm run test

# unit test only
npm run test:unit

# integration test only
npm run test:integration
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

Made with ❤️ at [Nuxify](https://seline.pages.dev)
