export interface APIResponse<T> {
	readonly success: boolean
	readonly message: string
	readonly errorCode?: string
	readonly data: T
}

export interface ErrorAPIResponse {
	readonly success: boolean
	readonly message: string
	readonly errorCode?: string
}
