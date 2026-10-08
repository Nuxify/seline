import { PUBLIC_API_URL, PUBLIC_ENV } from '$app/env/public'

export const AxiosConfig = {
	baseURL: PUBLIC_API_URL,
	debug: PUBLIC_ENV !== 'production'
}
