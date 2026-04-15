import type { Writable } from 'svelte/store'
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
 * Create an API handler for store.
 * @param writable - The writable store to update with the API state.
 * @param repositoryFn - The repository function to execute.
 * @param onSuccessFn - The function to execute on success.
 * @param onErrorFn - The function to execute on error.
 * @returns The API handler.
 */
export function createAPIHandler<TRequest, TResponse, TMappedResponse>(
	writable: Writable<StateDTO<TMappedResponse>>,
	repositoryFn: (request: TRequest) => Promise<APIResponse<TResponse>>,
	onSuccessFn?: (data: TResponse) => TMappedResponse,
	onErrorFn?: (error: ErrorAPIResponse) => void
) {
	return {
		...writable,
		async call(request: TRequest): Promise<void> {
			// loading
			writable.update((store) => {
				store.state.LOADING = true
				store.state.SUCCESS = false
				store.state.FAILED = false
				return store
			})

			try {
				const response = await repositoryFn(request)

				let mappedResponse: TMappedResponse
				if (onSuccessFn) {
					// execute success function
					mappedResponse = onSuccessFn(response.data)
				} else {
					mappedResponse = response.data as unknown as TMappedResponse
				}

				// success
				writable.update((store) => {
					store.state.LOADING = false
					store.state.SUCCESS = true
					store.state.FAILED = false
					store.response = {
						message: response.message,
						errorCode: null,
						data: mappedResponse
					}
					return store
				})
			} catch (error) {
				const err = error as ErrorAPIResponse

				// failed
				writable.update((store) => {
					store.state.LOADING = false
					store.state.SUCCESS = false
					store.state.FAILED = true
					store.response = {
						message: err.message,
						errorCode: err.errorCode ?? null,
						data: {} as TMappedResponse
					}
					return store
				})

				if (onErrorFn) {
					// execute error function
					onErrorFn(err)
				}
			} finally {
				// reset
				writable.update((store) => {
					store.state.LOADING = false
					store.state.SUCCESS = false
					store.state.FAILED = false
					return store
				})
			}
		}
	}
}
