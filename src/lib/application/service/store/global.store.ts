import { writable } from 'svelte/store'
import type { StateDTO } from './global.dto'

const state: StateDTO = {
	alertMessage: '',
	showAlert: false
}
const { subscribe, set, update } = writable(state)

export const globalStore = {
	subscribe,
	set,
	update
}
