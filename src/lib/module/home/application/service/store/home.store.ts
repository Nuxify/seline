import { writable } from 'svelte/store'
import type { StateDTO } from './home.dto'

const state: StateDTO = {
	selectedPost: {
		id: 0,
		userId: 0,
		title: '',
		body: ''
	}
}
const { subscribe, update } = writable(state)

export const homeStore = {
	subscribe,
	update
}
