import { type StateDTO } from '$lib/core/application/service/store/global.dto'
import { createContext, getContext, setContext } from 'svelte'

export class GlobalState {
	state = $state<StateDTO>({
		alertMessage: '',
		alertVariant: '',
		showAlert: false,
		drawerMiniVariant: false,
		isShowDrawer: false
	})

	constructor() {}

	showAlert(option: { message: string; variant: string }, timeout: number = 3000): void {
		this.state.showAlert = true
		this.state.alertMessage = option.message
		this.state.alertVariant = option.variant

		setTimeout(() => {
			this.state.showAlert = false
		}, timeout)
	}
}

const DEFAULT_KEY = 'globalState'

// export function setGlobalState(key: string = DEFAULT_KEY) {
// 	return setContext(key, new GlobalState())
// }

// export function getGlobalState(key: string = DEFAULT_KEY) {
// 	return getContext<ReturnType<typeof setGlobalState>>(key)
// }

export const [getGlobalStateContext, setGlobalStateContext] = createContext<StateDTO>()
