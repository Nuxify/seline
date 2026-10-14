import { expect, test } from '@playwright/test'

function uniqueEmail(prefix: string): string {
	return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 10000)}@example.com`
}

test.describe('registration', () => {
	test('user can register with valid details and is redirected to login', async ({ page }) => {
		const email = uniqueEmail('register')

		await page.goto('/register')
		await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible()

		// step 1: name
		await page.getByPlaceholder('Enter your name').fill('Jane Doe')
		await page.getByRole('button', { name: 'Next' }).click()

		// step 2: email & password
		await page.getByPlaceholder('Enter your email').fill(email)
		await page.getByPlaceholder('Enter your password').fill('SuperSecret123')
		await page.getByPlaceholder('Confirm your password').fill('SuperSecret123')

		await page.getByRole('button', { name: 'Register' }).click()

		// success alert should show
		await expect(page.getByText('Account created successfully.')).toBeVisible()

		// redirected to /login
		await expect(page).toHaveURL(/\/login$/)
	})

	test('shows validation error for empty name on step 1', async ({ page }) => {
		await page.goto('/register')

		await page.getByRole('button', { name: 'Next' }).click()

		await expect(page.getByTestId('name-error')).toHaveText('Name is required.')
	})

	test('shows validation errors for empty step 2 submission', async ({ page }) => {
		await page.goto('/register')

		await page.getByPlaceholder('Enter your name').fill('Jane Doe')
		await page.getByRole('button', { name: 'Next' }).click()

		await page.getByRole('button', { name: 'Register' }).click()

		await expect(page.getByTestId('email-error')).toHaveText('Email is required.')
		await expect(page.getByTestId('password-error')).toHaveText('Password is required.')
	})

	test('shows validation error for invalid email format', async ({ page }) => {
		await page.goto('/register')

		await page.getByPlaceholder('Enter your name').fill('Jane Doe')
		await page.getByRole('button', { name: 'Next' }).click()

		await page.getByPlaceholder('Enter your email').fill('not-an-email')
		await page.getByPlaceholder('Enter your password').fill('SuperSecret123')
		await page.getByPlaceholder('Confirm your password').fill('SuperSecret123')

		await page.getByRole('button', { name: 'Register' }).click()

		await expect(page.getByTestId('email-error')).toHaveText('Enter a valid email address.')
	})

	test('shows validation error when passwords do not match', async ({ page }) => {
		await page.goto('/register')

		await page.getByPlaceholder('Enter your name').fill('Jane Doe')
		await page.getByRole('button', { name: 'Next' }).click()

		await page.getByPlaceholder('Enter your email').fill(uniqueEmail('mismatch'))
		await page.getByPlaceholder('Enter your password').fill('SuperSecret123')
		await page.getByPlaceholder('Confirm your password').fill('DifferentPassword')

		await page.getByRole('button', { name: 'Register' }).click()

		await expect(page.getByTestId('confirm-password-error')).toHaveText('Passwords do not match.')
	})

	test('shows validation error for short password', async ({ page }) => {
		await page.goto('/register')

		await page.getByPlaceholder('Enter your name').fill('Jane Doe')
		await page.getByRole('button', { name: 'Next' }).click()

		await page.getByPlaceholder('Enter your email').fill(uniqueEmail('short'))
		await page.getByPlaceholder('Enter your password').fill('short')
		await page.getByPlaceholder('Confirm your password').fill('short')

		await page.getByRole('button', { name: 'Register' }).click()

		await expect(page.getByTestId('password-error')).toHaveText(
			'Password must be at least 8 characters.'
		)
	})

	test('can navigate back from step 2 to step 1', async ({ page }) => {
		await page.goto('/register')

		await page.getByPlaceholder('Enter your name').fill('Jane Doe')
		await page.getByRole('button', { name: 'Next' }).click()

		await expect(page.getByPlaceholder('Enter your email')).toBeVisible()

		await page.getByRole('button', { name: 'Back' }).click()

		await expect(page.getByPlaceholder('Enter your name')).toBeVisible()
		await expect(page.getByPlaceholder('Enter your name')).toHaveValue('Jane Doe')
	})

	test('prevents registering with a duplicate email', async ({ page }) => {
		const email = uniqueEmail('duplicate')

		// register once
		await page.goto('/register')
		await page.getByPlaceholder('Enter your name').fill('Jane Doe')
		await page.getByRole('button', { name: 'Next' }).click()
		await page.getByPlaceholder('Enter your email').fill(email)
		await page.getByPlaceholder('Enter your password').fill('SuperSecret123')
		await page.getByPlaceholder('Confirm your password').fill('SuperSecret123')
		await page.getByRole('button', { name: 'Register' }).click()
		await expect(page).toHaveURL(/\/login$/)

		// attempt to register again with the same email
		await page.goto('/register')
		await page.getByPlaceholder('Enter your name').fill('Jane Doe')
		await page.getByRole('button', { name: 'Next' }).click()
		await page.getByPlaceholder('Enter your email').fill(email)
		await page.getByPlaceholder('Enter your password').fill('SuperSecret123')
		await page.getByPlaceholder('Confirm your password').fill('SuperSecret123')
		await page.getByRole('button', { name: 'Register' }).click()

		await expect(page.getByText('An account with this email already exists.')).toBeVisible()
		await expect(page).toHaveURL(/\/register$/)
	})
})

