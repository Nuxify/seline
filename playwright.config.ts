import { devices, type PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	fullyParallel: true,
	reporter: 'html',
	use: {
		// Base URL to use in actions like `await page.goto('/')`.
		baseURL: 'http://localhost:3000',
		// Collect trace when retrying the failed test.
		trace: 'on-first-retry'
	},
	projects: [
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
		}

		// /* Test against mobile viewports. */
		// {
		// 	name: 'Mobile Chrome',
		// 	use: { ...devices['Pixel 5'] }
		// },
		// {
		// 	name: 'Mobile Safari',
		// 	use: { ...devices['iPhone 12'] }
		// },

		// /* Test against branded browsers. */
		// {
		// 	name: 'Microsoft Edge',
		// 	use: {
		// 		...devices['Desktop Edge'],
		// 		channel: 'msedge'
		// 	}
		// },
		// {
		// 	name: 'Google Chrome',
		// 	use: {
		// 		...devices['Desktop Chrome'],
		// 		channel: 'chrome'
		// 	}
		// }
	]
}

export default config
