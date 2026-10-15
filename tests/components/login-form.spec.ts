import { expect, test } from '@playwright/test'

test('validates credentials and submits login details', async ({ mount }) => {
	const component = await mount('LoginForm')

	await component.getByRole('button', { name: 'Log in' }).click()
	await expect(component.getByTestId('email-error')).toHaveText('Email is required.')
	await expect(component.getByTestId('password-error')).toHaveText('Password is required.')

	await component.getByLabel('Email').fill('seline@example.com')
	await component.getByLabel('Password').fill('secure-password')
	await component.getByRole('button', { name: 'Log in' }).click()

	await expect(component.getByTestId('submitted-credentials')).toHaveValue(
		'{"email":"seline@example.com","password":"secure-password"}'
	)
})

test('shows loading state and disables submission', async ({ mount }) => {
	const component = await mount('LoginForm', { loading: true })
	const submit = component.getByRole('button', { name: 'Logging in...' })

	await expect(submit).toBeDisabled()
})
