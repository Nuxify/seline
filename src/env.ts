import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	API_URL: { public: true, static: true },
	APP_ENV: { public: true, static: true }
})
