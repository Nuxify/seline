import { PUBLIC_API_URL, PUBLIC_ENV } from '$env/static/public'

export const AxiosConfig = {
	baseURL: PUBLIC_API_URL,
	debug: PUBLIC_ENV === 'production'
}
