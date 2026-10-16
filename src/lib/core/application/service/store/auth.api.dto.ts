export interface StateDTO<T> {
	state: {
		LOADING: boolean
		SUCCESS: boolean
		FAILED: boolean
	}
	response: {
		message: string
		errorCode?: string | null
		data: T
	}
}

export interface RegisterRequest {
	name: string
	email: string
	password: string
	country: string
}

export interface RegisterResponse {
	id: string
	name: string
	email: string
	country: string
}

export interface LoginRequest {
	email: string
	password: string
}

export interface LoginResponse {
	id: string
	name: string
	email: string
	country: string
}
