import { writable } from 'svelte/store'
import type { WritableDTO, LsKeys } from './localstorage.dto'
import { LocalStorageRepository } from '$lib/infrastructures/repository/localstorage.repository'

const state: WritableDTO = {
	lastKnownKey: '',
	lastKnownValue: ''
}
const { subscribe, update } = writable(state)

/// dependency injection
const ILocalStorageRepository = new LocalStorageRepository()

export const localStorageStore = {
	subscribe,
	async Clear(): Promise<void> {
		ILocalStorageRepository.Clear()

		update((store) => {
			store.lastKnownKey = ''
			store.lastKnownValue = ''
			return store
		})
	},
	async GetItem(key: LsKeys): Promise<string | null> {
		return ILocalStorageRepository.GetItem(key)
	},
	async RemoveItem(key: LsKeys): Promise<void> {
		ILocalStorageRepository.RemoveItem(key)

		update((store) => {
			store.lastKnownKey = key
			store.lastKnownValue = ''
			return store
		})
	},
	async SetItem(key: LsKeys, value: string): Promise<void> {
		ILocalStorageRepository.SetItem(key, value)

		update((store) => {
			store.lastKnownKey = key
			store.lastKnownValue = value
			return store
		})
	}
}
