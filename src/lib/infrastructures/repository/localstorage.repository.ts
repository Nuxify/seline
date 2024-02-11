export interface ILocalStorageRepository {
	Clear(): void
	GetItem(key: string): string | null
	RemoveItem(key: string): void
	SetItem(key: string, value: string): void
}

export class LocalStorageRepository implements ILocalStorageRepository {
	/**
	 * Clear local storage
	 *
	 * @return  {void}
	 */
	public Clear(): void {
		localStorage.clear()
	}

	/**
	 * Get local storage value by key
	 *
	 * @param   {string}  key
	 *
	 * @return  {string}
	 */
	public GetItem(key: string): string | null {
		return localStorage.getItem(key)
	}

	/**
	 * Remove local storage value by key
	 *
	 * @param   {string}  key
	 *
	 * @return  {void}
	 */
	public RemoveItem(key: string): void {
		localStorage.removeItem(key)
	}

	/**
	 * set local storage value given by key
	 *
	 * @param   {string}  key
	 * @param   {string}  value
	 *
	 * @return  {void}
	 */
	public SetItem(key: string, value: string): void {
		localStorage.setItem(key, value)
	}
}
