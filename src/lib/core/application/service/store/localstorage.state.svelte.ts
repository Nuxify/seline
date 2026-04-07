import { LocalStorageRepository } from '$lib/servicecontainer'
import type { StateDTO, LsKeys } from './localstorage.dto'

const state: StateDTO = {
	lastKnownKey: '',
	lastKnownValue: ''
}

export const localStorageState = $state<StateDTO>(state)

export function ClearLocalStorage(): void {
	LocalStorageRepository.Clear()
	localStorageState.lastKnownKey = ''
	localStorageState.lastKnownValue = ''
}

export function GetLocalStorageItem(key: LsKeys): string | null {
	return LocalStorageRepository.GetItem(key)
}

export function RemoveLocalStorageItem(key: LsKeys): void {
	LocalStorageRepository.RemoveItem(key)
	localStorageState.lastKnownKey = key
	localStorageState.lastKnownValue = ''
}

export function SetLocalStorageItem(key: LsKeys, value: string): void {
	LocalStorageRepository.SetItem(key, value)
	localStorageState.lastKnownKey = key
	localStorageState.lastKnownValue = value
}
