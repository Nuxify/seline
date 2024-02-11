import { writable } from 'svelte/store'
import type { WritableDTO } from './home.dto'

const state: WritableDTO = {
	selectedPost: {
		id: 0,
		userId: 0,
		title: '',
		body: ''
	}
}
const { subscribe, set, update } = writable(state)

export const homeStore = {
	subscribe,
	set,
	update
}
