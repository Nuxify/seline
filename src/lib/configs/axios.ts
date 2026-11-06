import { API_URL, ENV } from '$app/env/public'

export const AxiosConfig = {
	baseURL: API_URL,
	debug: ENV !== 'production'
}
