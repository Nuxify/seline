# Seline

SvelteKit template for building modern and blazing fast webapps. Flowbite/Tailwind included.

> Demo: https://seline.pages.dev/

## Importing Style Guide

We encourage to follow the importing style guide below:

```ts
<script lang="ts">
    import <svelte built-in packages>
    import <third-party packages>
    import <api stores>
    import <api stores dto>
    import <stores and stores dto>
    import <global components and dto>
    import <components and dto>
    import <internals or utils>

    ...
</script>
```

> We recommend to use 'alias' path when importing ($lib/).

Example:

```ts
<script lang="ts">
    import { onMount } from 'svelte'
    import { sineIn } from 'svelte/easing'
    import { MapLibre, Marker, Popup } from 'svelte-maplibre'
    import { ChevronLeftOutline, ChevronRightOutline, PlusSolid } from 'flowbite-svelte-icons'
    import {
        Button,
		ButtonGroup,
		Drawer,
		Modal,
		Input,
		Table
	} from 'flowbite-svelte'
    import {
		checkpointAPI,
		addCheckpointStore,
		deleteCheckpointStore,
		getCheckpointsStore,
		updateCheckpointStore
	} from '$lib/application/service/store/checkpoint.api.store'
    import type { CheckpointResponse } from '$lib/application/service/store/checkpoint.api.dto'
    import { globalStore } from '$lib/application/service/store/global.store'
    import { MessageStatus } from '$lib/application/service/store/global.dto'
    import { uploadFileStore } from '$lib/application/service/store/media.api.store'
    import { SEO } from '$components'
    import { locale, t } from '$lib/internal/translations'
    import { convertEpochToTimeAndDate, copyToClipboard, shortenString } from '$lib/internal/utils'

    ...
</script>
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

> Migration! SvelteKit 4 requires node >=18.x to work

```bash
# setup environment variables
cp .env.example .env

# sync svelte with tsconfig
npm run check

# run development mode
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
