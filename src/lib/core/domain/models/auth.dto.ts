export interface RegisterRequest {
	name: string
	email: string
	password: string
	country: string
}

export interface RegisterResponse {
	readonly id: string
	readonly name: string
	readonly email: string
	readonly country: string
}

export interface LoginRequest {
	email: string
	password: string
}

export interface LoginResponse {
	readonly id: string
	readonly name: string
	readonly email: string
	readonly country: string
}

export interface UserRecord {
	readonly id: string
	readonly name: string
	readonly email: string
	readonly password: string
	readonly country: string
}
