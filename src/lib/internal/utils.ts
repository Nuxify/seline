export function multiplier(getCount: () => number, k: number) {
	return {
		get value() {
			return getCount() * k
		}
	}
}
