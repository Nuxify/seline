import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import config from '../svelte.config.js'

const src = fileURLToPath(new URL('../src', import.meta.url))

// Standalone server: SvelteKit's dev server does not serve arbitrary html pages.
export default defineConfig({
	root: fileURLToPath(new URL('..', import.meta.url)),
	plugins: [svelte({ preprocess: config.preprocess, configFile: false })],
	resolve: {
		alias: { $lib: `${src}/lib`, $components: `${src}/lib/core/interfaces/components` }
	},
	server: { port: 3100, strictPort: true }
})
