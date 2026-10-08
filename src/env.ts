import { defineEnvVars } from '@sveltejs/kit/env'

export const variables = defineEnvVars({
	PUBLIC_API_URL: { public: true, static: true },
	PUBLIC_ENV: { public: true, static: true }
})
