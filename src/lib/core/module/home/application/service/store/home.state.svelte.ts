import type { StateDTO } from './home.dto'

const state: StateDTO = {
	selectedPost: {
		id: 0,
		userId: 0,
		title: '',
		body: ''
	}
}

export const homeState = $state<StateDTO>(state)
