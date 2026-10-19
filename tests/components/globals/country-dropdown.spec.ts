import { expect, test } from '@playwright/test'
import { Countries } from '$lib/internal/types'

test('renders on mount', async ({ mount }) => {
	const component = await mount('CountryDropdown')

	await expect(component.getByRole('combobox', { name: 'Country' })).toBeVisible()
})

test('shows country options and updates the selected country', async ({ mount }) => {
	const component = await mount('CountryDropdown')
	const country = component.getByRole('combobox', { name: 'Country' })

	await expect(country).toHaveValue('PH')
	await expect(country.locator('option')).toHaveText([
		'Choose option ...',
		...Object.values(Countries)
	])

	await country.selectOption('KO')
	await expect(component.getByTestId('selected-country')).toHaveValue('KO')
})
