import { expect, type Page } from '@playwright/test'
import { faker } from '@faker-js/faker'

export const PASSWORD = 'SuperSecret123'

export function uniqueEmail(prefix: string): string {
	return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 10000)}@example.com`
}

export function uniqueName(): string {
	return `${faker.person.firstName()} ${faker.person.lastName()}`
}

export async function registerAndLogin(page: Page, prefix: string): Promise<void> {
	const email = uniqueEmail(prefix)

	await page.goto('/register')
	await page.getByPlaceholder('Enter your name').fill(uniqueName())
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

export async function register(page: Page, email: string, name: string): Promise<void> {
	await page.goto('/register')
	await page.getByPlaceholder('Enter your name').fill(name)
	await page.getByRole('button', { name: 'Next' }).click()
	await page.getByPlaceholder('Enter your email').fill(email)
	await page.getByPlaceholder('Enter your password').fill(PASSWORD)
	await page.getByPlaceholder('Confirm your password').fill(PASSWORD)
	await page.getByRole('button', { name: 'Register' }).click()
	await expect(page).toHaveURL('/login')
}

export async function login(page: Page, email: string): Promise<void> {
	await page.goto('/login')
	await page.getByPlaceholder('Enter your email').fill(email)
	await page.getByPlaceholder('Enter your password').fill(PASSWORD)
	await page.getByRole('button', { name: 'Log in' }).click()
	await expect(page).toHaveURL('/')
}

export async function logout(page: Page): Promise<void> {
	await page.goto('/')
	await page.getByRole('button', { name: 'Log out' }).click()
	await expect(page).toHaveURL('/login')
}
