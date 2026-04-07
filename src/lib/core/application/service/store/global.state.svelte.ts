import type { AlertOptions, StateDTO } from './global.dto'

const state: StateDTO = {
	alertMessage: '',
	alertVariant: '',
	showAlert: false,
	drawerMiniVariant: false,
	isShowDrawer: false
}

export const globalState = $state<StateDTO>(state)

export function ShowAlert(option: AlertOptions, timeout: number = 3000): void {
	globalState.showAlert = true
	globalState.alertMessage = option.message
	globalState.alertVariant = option.variant

	setTimeout(() => {
		globalState.showAlert = false
	}, timeout)
}
