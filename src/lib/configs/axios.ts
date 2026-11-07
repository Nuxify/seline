import { API_URL, APP_ENV } from '$app/env/public'

export const AxiosConfig = {
	baseURL: API_URL,
	debug: APP_ENV !== 'production'
}
