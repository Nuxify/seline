import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { sveltekit } from '@sveltejs/kit/vite'
import { svelteTesting } from '@testing-library/svelte/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
	plugins: [
		sveltekit({
			// Consult https://kit.svelte.dev/docs/integrations#preprocessors
			// for more information about preprocessors
			preprocess: vitePreprocess({
				style: true,
				script: true
			}),

			adapter: adapter({
				// default options are shown. On some platforms
				// these options are set automatically — see below
				pages: 'build',
				assets: 'build',
				fallback: 'index.html',
				precompress: false,
				strict: true
			}),
			alias: { $components: 'src/lib/core/interfaces/components' }
		}),
		svelteTesting()
	],
	test: {
		include: [
			'src/**/*.{test,spec}.{js,ts}',
			'tests/component/**/*.test.ts',
			'tests/e2e/**/*.test.ts',
			'tests/unit/**/*.test.ts'
		],
		environment: 'jsdom'
	},
	resolve: {
		...(mode === 'test' ? { conditions: ['browser'] } : {})
	}
}))
