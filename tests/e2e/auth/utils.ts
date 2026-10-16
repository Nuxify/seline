import { expect, type Page } from '@playwright/test'

const PASSWORD = 'SuperSecret123'

function uniqueEmail(prefix: string): string {
	return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 10000)}@example.com`
}

export async function registerAndLogin(page: Page, prefix: string): Promise<void> {
	const email = uniqueEmail(prefix)

	await page.goto('/register')
	await page.getByPlaceholder('Enter your name').fill(`${prefix} User`)
	await page.getByRole('button', { name: 'Next' }).click()
	await page.getByPlaceholder('Enter your email').fill(email)
	await page.getByPlaceholder('Enter your password').fill(PASSWORD)
	await page.getByPlaceholder('Confirm your password').fill(PASSWORD)
	await page.getByRole('button', { name: 'Register' }).click()
	await expect(page).toHaveURL('/login')

	await page.getByPlaceholder('Enter your email').fill(email)
	await page.getByPlaceholder('Enter your password').fill(PASSWORD)
	await page.getByRole('button', { name: 'Log in' }).click()
	await expect(page).toHaveURL('/')
}
