import { expect, test } from '@playwright/test'

test('shows country options and updates the selected country', async ({ mount }) => {
	const component = await mount('CountryDropdown')
	const country = component.getByRole('combobox', { name: 'Country' })

	await expect(country).toHaveValue('PH')
	await expect(country.locator('option')).toHaveText([
		'Choose option ...',
		'Philippines',
		'France',
		'South Korea'
	])

	await country.selectOption('KO')
	await expect(component.getByTestId('selected-country')).toHaveValue('KO')
})
