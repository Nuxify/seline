import { writable } from 'svelte/store'
import type { WritableDTO } from './global.dto'

const state: WritableDTO = {
	alertMessage: '',
	showAlert: false
}
const { subscribe, set, update } = writable(state)

export const globalStore = {
	subscribe,
	set,
	update
}
