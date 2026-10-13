import type { APIResponse } from '$lib/core/domain/models/dto'
import type {
	RegisterRequest,
	RegisterResponse,
	LoginRequest,
	LoginResponse
} from '$lib/core/domain/models/auth.dto'

export interface IAuthRepository {
	/**
	 * Register a new user
	 *
	 * @param   {RegisterRequest<APIResponse><RegisterResponse>}  request
	 *
	 * @return  {Promise<APIResponse><RegisterResponse>}
	 */
	Register(request: RegisterRequest): Promise<APIResponse<RegisterResponse>>

	/**
	 * Login an existing user
	 *
	 * @param   {LoginRequest<APIResponse><LoginResponse>}  request
	 *
	 * @return  {Promise<APIResponse><LoginResponse>}
	 */
	Login(request: LoginRequest): Promise<APIResponse<LoginResponse>>

	/**
	 * Logout the current session
	 *
	 * @return  {void}
	 */
	Logout(): void

	/**
	 * Get the currently persisted session, if any
	 *
	 * @return  {LoginResponse | null}
	 */
	GetSession(): LoginResponse | null
}
