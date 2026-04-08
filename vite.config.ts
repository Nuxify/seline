import { sveltekit } from '@sveltejs/kit/vite'
import { svelteTesting } from '@testing-library/svelte/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit(), svelteTesting()],
	test: {
		include: [
			'src/**/*.{test,spec}.{js,ts}',
			'tests/unit/**/*.test.ts',
			'tests/component/**/*.test.ts'
		],
		environment: 'jsdom'
	},
	resolve: {
		conditions: mode === 'test' ? ['browser'] : []
	}
}))
