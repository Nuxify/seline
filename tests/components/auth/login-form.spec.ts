import { expect, test } from '@playwright/test'

test.describe('LoginForm', () => {
	const email = 'seline@example.com'
	const password = 'secure-password'

	test('renders on mount', async ({ mount }) => {
		const component = await mount('LoginForm')

		await expect(component.getByRole('button', { name: 'Log in' })).toBeVisible()
	})

	test('validates credentials and submits login details', async ({ mount }) => {
		const component = await mount('LoginForm')

		// click the "Log in" button without filling in credentials and verify validation errors
		await component.getByRole('button', { name: 'Log in' }).click()
		await expect(component.getByTestId('email-error')).toHaveText('Email is required.')
		await expect(component.getByTestId('password-error')).toHaveText('Password is required.')
		await expect(component.getByTestId('submitted-credentials')).toHaveValue('')

		// fill in the credentials and submit the form
		await component.getByLabel('Email').fill(email)
		await component.getByLabel('Password').fill(password)
		await component.getByRole('button', { name: 'Log in' }).click()

		// verify that the validation errors are cleared after filling in the credentials
		await expect(component.getByTestId('submitted-credentials')).toHaveValue(
			`{"email":"${email}","password":"${password}"}`
		)
	})

	test('shows loading state and disables submission', async ({ mount }) => {
		const component = await mount('LoginForm', { loading: true })
		// verify that the submit button shows the loading state and is disabled
		const submit = component.getByRole('button', { name: 'Logging in...' })

		await expect(submit).toBeDisabled()
	})
})
