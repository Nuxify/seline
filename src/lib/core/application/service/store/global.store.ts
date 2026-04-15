import { writable } from 'svelte/store'
import type { AlertOptions, StateDTO } from './global.dto'

const state: StateDTO = {
	// alert
	alertMessage: '',
	alertVariant: '',
	showAlert: false,
	// drawer
	drawerMiniVariant: false,
	isShowDrawer: false
}

const { subscribe, update } = writable(state)

export const globalStore = {
	subscribe,
	update,
	ShowAlert(option: AlertOptions, timeout: number = 3000): void {
		update((store) => {
			store.showAlert = true
			store.alertMessage = option.message
			store.alertVariant = option.variant
			return store
		})

		setTimeout(() => {
			update((store) => {
				store.showAlert = false
				return store
			})
		}, timeout)
	}
}
