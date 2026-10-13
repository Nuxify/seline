/**
 * Multiplies value from getCount by k, returns object with reactive value proprty
 *
 * @param getCount - function that returns a number, typically a count
 * @param k - multiplier
 * @returns object with a `value` property
 */
export function multiplier(getCount: () => number, k: number) {
	return {
		// Reactive value property that updates whenever getCount changes
		get value() {
			return getCount() * k
		}
	}
}
