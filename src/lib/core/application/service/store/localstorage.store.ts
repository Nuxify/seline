import { writable } from 'svelte/store'
import { LocalStorageRepository } from '$lib/servicecontainer'
import type { StateDTO, LsKeys } from './localstorage.dto'

const state: StateDTO = {
	lastKnownKey: '',
	lastKnownValue: ''
}
const { subscribe, update } = writable(state)

export const localStorageStore = {
	subscribe,
	async Clear(): Promise<void> {
		LocalStorageRepository.Clear()

		update((store) => {
			store.lastKnownKey = ''
			store.lastKnownValue = ''
			return store
		})
	},
	async GetItem(key: LsKeys): Promise<string | null> {
		return LocalStorageRepository.GetItem(key)
	},
	async RemoveItem(key: LsKeys): Promise<void> {
		LocalStorageRepository.RemoveItem(key)

		update((store) => {
			store.lastKnownKey = key
			store.lastKnownValue = ''
			return store
		})
	},
	async SetItem(key: LsKeys, value: string): Promise<void> {
		LocalStorageRepository.SetItem(key, value)

		update((store) => {
			store.lastKnownKey = key
			store.lastKnownValue = value
			return store
		})
	}
}
