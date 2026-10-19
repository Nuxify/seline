import { expect, test } from '@playwright/test'

test.describe('RegisterForm', () => {
	const name = 'Seline'
	const email = 'seline@example.com'
	const password = 'secure-password'
	const country = 'KO'

	test('renders on mount', async ({ mount }) => {
		const component = await mount('RegisterForm')

		await expect(component.getByLabel('Name')).toBeVisible()
	})

	test('validates each registration step and submits account details', async ({ mount }) => {
		const component = await mount('RegisterForm')

		// validate name field
		await component.getByRole('button', { name: 'Next' }).click()
		await expect(component.getByTestId('name-error')).toHaveText('Name is required.')
		await expect(component.getByTestId('submitted-credentials')).toHaveValue('')
		await component.getByLabel('Name').fill(name)

		// validate country field
		const countryField = component.getByRole('combobox', { name: 'Country' })
		await countryField.selectOption(country)
		await expect(countryField).toHaveValue(country)
		await component.getByRole('button', { name: 'Next' }).click()

		// validate email and password fields
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

		// fill in valid email and password fields and submit
		await component.getByLabel('Email').fill(email)
		await component.getByLabel('Password', { exact: true }).fill(password)
		await component.getByLabel('Confirm Password').fill(password)
		await component.getByRole('button', { name: 'Register' }).click()

		await expect(component.getByTestId('submitted-credentials')).toHaveValue(
			`{"name":"${name}","country":"${country}","email":"${email}","password":"${password}"}`
		)
	})

	test('shows loading state and disables registration', async ({ mount }) => {
		const component = await mount('RegisterForm', { loading: true })
		await component.getByLabel('Name').fill('Seline')
		await component.getByRole('button', { name: 'Next' }).click()
		const submit = component.getByRole('button', { name: 'Creating account...' })

		// verify that the submit button is disabled while loading
		await expect(submit).toBeDisabled()
	})
})
