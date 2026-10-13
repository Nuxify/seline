import { writable } from 'svelte/store'
import { AuthRepository } from '$lib/servicecontainer'
import type {
	RegisterResponse as ModelRegisterResponse,
	LoginResponse as ModelLoginResponse
} from '$lib/core/domain/models/auth.dto'
import type {
	StateDTO,
	RegisterRequest,
	RegisterResponse,
	LoginRequest,
	LoginResponse
} from './auth.api.dto'
import { createAPIHandler } from '$lib/internal/api.store'

const registerWritable = writable<StateDTO<RegisterResponse>>({
	state: {
		LOADING: false,
		SUCCESS: false,
		FAILED: false
	},
	response: {
		message: '',
		errorCode: null,
		data: {} as RegisterResponse
	}
})

const loginWritable = writable<StateDTO<LoginResponse>>({
	state: {
		LOADING: false,
		SUCCESS: false,
		FAILED: false
	},
	response: {
		message: '',
		errorCode: null,
		data: {} as LoginResponse
	}
})

export const registerStore = createAPIHandler<
	RegisterRequest,
	ModelRegisterResponse,
	RegisterResponse
>(registerWritable, AuthRepository.Register.bind(AuthRepository))

export const loginStore = createAPIHandler<LoginRequest, ModelLoginResponse, LoginResponse>(
	loginWritable,
	AuthRepository.Login.bind(AuthRepository)
)

/**
 * Logout the current user and clear the persisted session.
 */
export function logout(): void {
	AuthRepository.Logout()
}

/**
 * Get the currently authenticated session, if any.
 */
export function getSession(): ModelLoginResponse | null {
	return AuthRepository.GetSession()
}

export const authAPI = {
	registerStore,
	loginStore,
	logout,
	getSession
}
