import { expect, test } from '@playwright/test'
import { login, logout, register, uniqueEmail, uniqueName } from './onboarding-function'

test.describe('Onboarding', () => {
	const name = uniqueName()
	const email = uniqueEmail(name.replace(' ', '.'))

	test('Register', async ({ page }) => {
		await register(page, email, name, 'FR')
	})

	test('Login', async ({ page }) => {
		await register(page, email, name, 'FR')
		await login(page, email)
	})

	test('Logout', async ({ page }) => {
		await register(page, email, name, 'KO')
		await login(page, email)
		await logout(page)
	})

	test('Home', async ({ page }) => {
		await register(page, email, name, 'FR')
		await login(page, email)
		await expect(page).toHaveTitle('Seline - SvelteKit Template')
	})

	test('Profile', async ({ page }) => {
		await register(page, email, name, 'KO')
		await login(page, email)
		await page.getByTestId('profile-link').click()

		await expect(page).toHaveURL(/\/profile$/)
		await expect(page.getByTestId('profile-name')).toContainText(name)
		await expect(page.getByTestId('profile-email')).toContainText(email)
		await expect(page.getByTestId('profile-country')).toHaveText('Country: South Korea')
	})
})
