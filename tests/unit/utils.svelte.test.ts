import { expect, test } from 'vitest'
import { multiplier } from '$lib/internal/utils'

test('Multiplier', () => {
	let count = $state(0)
	let double = multiplier(() => count, 2)

	expect(double.value).toEqual(0)

	count = 5

	expect(double.value).toEqual(10)
})
