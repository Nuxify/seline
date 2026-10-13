import { expect, test, type Page } from '@playwright/test'

function uniqueEmail(prefix: string): string {
	return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 10000)}@example.com`
}

const PASSWORD = 'SuperSecret123'

/**
 * Register a new user through the UI and return the credentials used.
 */
async function registerUser(
	page: Page,
	namePrefix: string
): Promise<{ name: string; email: string }> {
	const name = `${namePrefix} User`
	const email = uniqueEmail(namePrefix)

	await page.goto('/register')
	await page.getByPlaceholder('Enter your name').fill(name)
	await page.getByPlaceholder('Enter your email').fill(email)
	await page.getByPlaceholder('Enter your password').fill(PASSWORD)
	await page.getByPlaceholder('Confirm your password').fill(PASSWORD)
	await page.getByRole('button', { name: 'Register' }).click()
	await expect(page).toHaveURL(/\/login$/)

	return { name, email }
}

test.describe('login', () => {
	test('user can log in with valid credentials and lands on home', async ({ page }) => {
		const { name, email } = await registerUser(page, 'login')

		await page.getByPlaceholder('Enter your email').fill(email)
		await page.getByPlaceholder('Enter your password').fill(PASSWORD)
		await page.getByRole('button', { name: 'Log in' }).click()

		await expect(page.getByText('Logged in successfully.')).toBeVisible()
		await expect(page).toHaveURL('/')
		await expect(page.getByTestId('session-greeting')).toContainText(name)
	})

	test('shows error for unknown email', async ({ page }) => {
		await page.goto('/login')

		await page.getByPlaceholder('Enter your email').fill(uniqueEmail('unknown'))
		await page.getByPlaceholder('Enter your password').fill(PASSWORD)
		await page.getByRole('button', { name: 'Log in' }).click()

		await expect(page.getByText('Invalid email or password.')).toBeVisible()
		await expect(page).toHaveURL(/\/login$/)
	})

	test('shows error for incorrect password', async ({ page }) => {
		const { email } = await registerUser(page, 'wrongpass')

		await page.getByPlaceholder('Enter your email').fill(email)
		await page.getByPlaceholder('Enter your password').fill('WrongPassword123')
		await page.getByRole('button', { name: 'Log in' }).click()

		await expect(page.getByText('Invalid email or password.')).toBeVisible()
		await expect(page).toHaveURL(/\/login$/)
	})

	test('shows validation errors for empty form submission', async ({ page }) => {
		await page.goto('/login')

		await page.getByRole('button', { name: 'Log in' }).click()

		await expect(page.getByTestId('email-error')).toHaveText('Email is required.')
		await expect(page.getByTestId('password-error')).toHaveText('Password is required.')
	})

	test('session persists across page reloads', async ({ page }) => {
		const { name, email } = await registerUser(page, 'persist')

		await page.getByPlaceholder('Enter your email').fill(email)
		await page.getByPlaceholder('Enter your password').fill(PASSWORD)
		await page.getByRole('button', { name: 'Log in' }).click()
		await expect(page).toHaveURL('/')

		await page.reload()

		await expect(page.getByTestId('session-greeting')).toContainText(name)
	})

	test('authenticated user is redirected away from login and register pages', async ({ page }) => {
		const email = uniqueEmail('redirect-check')

		// register and log in a fresh user for this test
		await page.goto('/register')
		await page.getByPlaceholder('Enter your name').fill('Redirect User')
		await page.getByPlaceholder('Enter your email').fill(email)
		await page.getByPlaceholder('Enter your password').fill(PASSWORD)
		await page.getByPlaceholder('Confirm your password').fill(PASSWORD)
		await page.getByRole('button', { name: 'Register' }).click()
		await page.getByPlaceholder('Enter your email').fill(email)
		await page.getByPlaceholder('Enter your password').fill(PASSWORD)
		await page.getByRole('button', { name: 'Log in' }).click()
		await expect(page).toHaveURL('/')

		// visiting /login while authenticated should bounce back home
		await page.goto('/login')
		await expect(page).toHaveURL('/')

		// visiting /register while authenticated should bounce back home
		await page.goto('/register')
		await expect(page).toHaveURL('/')
	})

	test('user can log out and session is cleared', async ({ page }) => {
		const { email } = await registerUser(page, 'logout')

		await page.getByPlaceholder('Enter your email').fill(email)
		await page.getByPlaceholder('Enter your password').fill(PASSWORD)
		await page.getByRole('button', { name: 'Log in' }).click()
		await expect(page).toHaveURL('/')

		await page.getByTestId('logout-button').click()

		await expect(page).toHaveURL(/\/login$/)

		await page.goto('/')
		await expect(page.getByTestId('login-link')).toBeVisible()
	})
})
