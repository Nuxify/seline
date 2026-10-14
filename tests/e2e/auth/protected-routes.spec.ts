import { expect, test } from '@playwright/test'

function uniqueEmail(prefix: string): string {
	return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 10000)}@example.com`
}

const PASSWORD = 'SuperSecret123'

test.describe('protected routes', () => {
	test('unauthenticated user visiting /profile is redirected to /login', async ({ page }) => {
		await page.goto('/profile')
		await expect(page).toHaveURL(/\/login$/)
	})

	test('authenticated user can view their profile', async ({ page }) => {
		const name = 'Profile User'
		const email = uniqueEmail('profile')

		await page.goto('/register')
		await page.getByPlaceholder('Enter your name').fill(name)
		await page.getByRole('button', { name: 'Next' }).click()
		await page.getByPlaceholder('Enter your email').fill(email)
		await page.getByPlaceholder('Enter your password').fill(PASSWORD)
		await page.getByPlaceholder('Confirm your password').fill(PASSWORD)
		await page.getByRole('button', { name: 'Register' }).click()
		await expect(page).toHaveURL(/\/login$/)

		await page.getByPlaceholder('Enter your email').fill(email)
		await page.getByPlaceholder('Enter your password').fill(PASSWORD)
		await page.getByRole('button', { name: 'Log in' }).click()
		await expect(page).toHaveURL('/')

		await page.getByTestId('profile-link').click()

		await expect(page).toHaveURL(/\/profile$/)
		await expect(page.getByTestId('profile-name')).toContainText(name)
		await expect(page.getByTestId('profile-email')).toContainText(email)
	})
})
