import { expect, test } from '@playwright/test'
import { login, logout, register, uniqueEmail, uniqueName } from './onboarding-function'

test.describe('Onboarding', () => {
	const name = uniqueName()
	const email = uniqueEmail(name.replace(' ', '.'))

	test('Register', async ({ page }) => {
		await register(page, email, name)
	})

	test('Login', async ({ page }) => {
		await login(page, email)
	})

	test('Logout', async ({ page }) => {
		await login(page, email)
		await logout(page)
	})

	test('Home', async ({ page }) => {
		await login(page, email)
		await expect(page).toHaveTitle(/Home/)
	})

	test('Profile', async ({ page }) => {
		await login(page, email)
		await page.getByTestId('profile-link').click()

		await expect(page).toHaveURL(/\/profile$/)
		await expect(page.getByTestId('profile-name')).toContainText(name)
		await expect(page.getByTestId('profile-email')).toContainText(email)
	})
})
