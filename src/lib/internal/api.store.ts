import type { APIResponse, ErrorAPIResponse } from '$lib/core/domain/models/dto'

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

/**
 * Create an API handler that mutates reactive state.
 * @param state - Mutable API state object.
 * @param repositoryFn - The repository function to execute.
 * @param onSuccessFn - The function to execute on success.
 * @param onErrorFn - The function to execute on error.
 * @returns The API handler with `call`.
 */
export function createAPIHandler<TRequest, TResponse, TMappedResponse>(
	state: StateDTO<TMappedResponse>,
	repositoryFn: (request: TRequest) => Promise<APIResponse<TResponse>>,
	onSuccessFn?: (data: TResponse) => TMappedResponse,
	onErrorFn?: (error: ErrorAPIResponse) => void
) {
	return {
		async call(request: TRequest): Promise<void> {
			state.state.LOADING = true
			state.state.SUCCESS = false
			state.state.FAILED = false

			try {
				const response = await repositoryFn(request)

				let mappedResponse: TMappedResponse
				if (onSuccessFn) {
					mappedResponse = onSuccessFn(response.data)
				} else {
					mappedResponse = response.data as unknown as TMappedResponse
				}

				state.state.LOADING = false
				state.state.SUCCESS = true
				state.state.FAILED = false
				state.response = {
					message: response.message,
					errorCode: null,
					data: mappedResponse
				}
			} catch (error) {
				const err = error as ErrorAPIResponse

				state.state.LOADING = false
				state.state.SUCCESS = false
				state.state.FAILED = true
				state.response = {
					message: err.message,
					errorCode: err.errorCode ?? null,
					data: {} as TMappedResponse
				}

				if (onErrorFn) {
					onErrorFn(err)
				}
			} finally {
				// Only clear the LOADING flag here. Do not reset SUCCESS/FAILED —
				// they indicate the result of the call and should be observed by $effect.
				state.state.LOADING = false
			}
		},

		// reset result flags and response
		reset(): void {
			state.state.SUCCESS = false
			state.state.FAILED = false
			state.state.LOADING = false
		}
	}
}
