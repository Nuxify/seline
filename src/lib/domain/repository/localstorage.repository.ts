export interface ILocalStorageRepository {
	Clear(): void
	GetItem(key: string): string | null
	RemoveItem(key: string): void
	SetItem(key: string, value: string): void
}