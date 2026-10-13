import type { IAuthRepository } from '$lib/core/domain/repository/auth.repository'
import type {
	RegisterRequest,
	RegisterResponse,
	LoginRequest,
	LoginResponse,
	UserRecord
} from '$lib/core/domain/models/auth.dto'
import type { APIResponse, ErrorAPIResponse } from '$lib/core/domain/models/dto'
import { LsKeys } from '$lib/core/application/service/store/localstorage.dto'
import { APIErrors } from '$lib/internal/api.errors'

export class AuthRepository implements IAuthRepository {
	private readonly latencyMs: number

	constructor(latencyMs: number = 300) {
		this.latencyMs = latencyMs
	}

	/**
	 * Register user
	 *
	 * @param  {RegisterRequest}  request
	 *
	 * @return  {Promise<APIResponse<RegisterResponse>>}
	 */
	public async Register(request: RegisterRequest): Promise<APIResponse<RegisterResponse>> {
		await this.Delay()

		const users = this.GetUsers()
		const existing = users.find((user) => user.email.toLowerCase() === request.email.toLowerCase())

		if (existing) {
			const error: ErrorAPIResponse = {
				success: false,
				message: 'An account with this email already exists.',
				errorCode: APIErrors.DATABASE_ERROR
			}
			throw error
		}

		const newUser: UserRecord = {
			id: crypto.randomUUID(),
			name: request.name,
			email: request.email,
			password: request.password
		}

		users.push(newUser)
		this.SaveUsers(users)

		return {
			success: true,
			message: 'Account created successfully.',
			data: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email
			}
		}
	}

	/**
	 * Login user
	 *
	 * @param  {LoginRequest}  request
	 *
	 * @return  {Promise<APIResponse<LoginResponse>>}
	 */
	public async Login(request: LoginRequest): Promise<APIResponse<LoginResponse>> {
		await this.Delay()

		const users = this.GetUsers()
		const user = users.find((u) => u.email.toLowerCase() === request.email.toLowerCase())

		if (!user || user.password !== request.password) {
			const error: ErrorAPIResponse = {
				success: false,
				message: 'Invalid email or password.',
				errorCode: APIErrors.UNAUTHORIZED_ACCESS
			}
			throw error
		}

		const session: LoginResponse = {
			id: user.id,
			name: user.name,
			email: user.email
		}

		localStorage.setItem(LsKeys.SESSION, JSON.stringify(session))

		return {
			success: true,
			message: 'Logged in successfully.',
			data: session
		}
	}

	/**
	 * Logout user
	 *
	 * @return  {void}
	 */
	public Logout(): void {
		localStorage.removeItem(LsKeys.SESSION)
	}

	/**
	 * Get the currently persisted session, if any
	 *
	 * @return  {LoginResponse | null}
	 */
	public GetSession(): LoginResponse | null {
		const raw = localStorage.getItem(LsKeys.SESSION)
		return raw ? (JSON.parse(raw) as LoginResponse) : null
	}

	/**
	 * Get users
	 *
	 * @return  {UserRecord[]}
	 */
	private GetUsers(): UserRecord[] {
		const raw = localStorage.getItem(LsKeys.USERS)
		return raw ? (JSON.parse(raw) as UserRecord[]) : []
	}

	/**
	 * Save users
	 *
	 * @param  {UserRecord[]}  users
	 *
	 * @return  {void}
	 */
	private SaveUsers(users: UserRecord[]): void {
		localStorage.setItem(LsKeys.USERS, JSON.stringify(users))
	}

	/**
	 * Delay for a given amount of time
	 *
	 * @return  {Promise<void>}
	 */
	private Delay(): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, this.latencyMs))
	}
}
