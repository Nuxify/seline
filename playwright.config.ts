import { devices, type PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	webServer: [
		{
			command: 'npm run build && npm run preview',
			port: 4173,
			reuseExistingServer: true
		},
		{
			command: 'npx vite --config playwright/vite.config.ts',
			url: 'http://localhost:3100/playwright/gallery/index.html',
			reuseExistingServer: !process.env.CI
		}
	],
	testDir: 'tests/e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	fullyParallel: false,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:4173/',
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'components',
			testDir: './tests/components',
			use: {
				...devices['Desktop Chrome'],
				baseURL: 'http://localhost:3100/playwright/gallery/index.html',
				serviceWorkers: 'block',
				reuseContext: true
			}
		},
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] }
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] }
		},
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] }
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] }
		}
	]
}

export default config
