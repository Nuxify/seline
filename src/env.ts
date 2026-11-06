import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	API_URL: { public: true, static: true },
	ENV: { public: true, static: true }
})
