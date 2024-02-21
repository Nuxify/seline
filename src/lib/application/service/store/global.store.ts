import { writable } from 'svelte/store'
import type { AlertOptions, StateDTO } from './global.dto'

const state: StateDTO = {
	alertMessage: '',
	alertVariant: '',
	drawerMiniVariant: false,
	isShowDrawer: false,
	showAlert: false
}

const { subscribe, set, update } = writable(state)

export const globalStore = {
	subscribe,
	set,
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
