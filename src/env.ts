import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	APP_ENV: { public: true, static: true },
	API_URL: { public: true, static: true }
})
