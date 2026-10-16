import { expect, test } from '@playwright/test'

test('validates each registration step and submits account details', async ({ mount }) => {
	const component = await mount('RegisterForm')

	await component.getByRole('button', { name: 'Next' }).click()
	await expect(component.getByTestId('name-error')).toHaveText('Name is required.')
	await expect(component.getByTestId('submitted-credentials')).toHaveValue('')

	await component.getByLabel('Name').fill('Seline')
	const country = component.getByRole('combobox', { name: 'Country' })
	await country.selectOption('KO')
	await expect(country).toHaveValue('KO')
	await component.getByRole('button', { name: 'Next' }).click()

	await component.getByRole('button', { name: 'Register' }).click()
	await expect(component.getByTestId('email-error')).toHaveText('Email is required.')
	await expect(component.getByTestId('password-error')).toHaveText('Password is required.')
	await expect(component.getByTestId('submitted-credentials')).toHaveValue('')

	await component.getByLabel('Password', { exact: true }).fill('short')
	await component.getByRole('button', { name: 'Register' }).click()
	await expect(component.getByTestId('password-error')).toHaveText(
		'Password must be at least 8 characters.'
	)
	await expect(component.getByTestId('confirm-password-error')).toHaveText(
		'Passwords do not match.'
	)

	await component.getByLabel('Email').fill('seline@example.com')
	await component.getByLabel('Password', { exact: true }).fill('secure-password')
	await component.getByLabel('Confirm Password').fill('secure-password')
	await component.getByRole('button', { name: 'Register' }).click()

	await expect(component.getByTestId('submitted-credentials')).toHaveValue(
		'{"name":"Seline","country":"KO","email":"seline@example.com","password":"secure-password"}'
	)
})

test('shows loading state and disables registration', async ({ mount }) => {
	const component = await mount('RegisterForm', { loading: true })
	await component.getByLabel('Name').fill('Seline')
	await component.getByRole('button', { name: 'Next' }).click()
	const submit = component.getByRole('button', { name: 'Creating account...' })

	await expect(submit).toBeDisabled()
})
