import { type Page, expect } from '@playwright/test'
import { registerAndLogin } from '../1-auth/onboarding-function'

export async function createPost(page: Page) {
	const title = 'Test Post Title'
	const body = 'This is a test post body content'

	await registerAndLogin(page, 'home')
	await page.goto('/')
	await expect(page.getByRole('heading', { name: 'Seline: Social Media' })).toBeVisible()

	// fill the title input
	await page.getByPlaceholder('Enter title').fill(title)

	// fill the body input
	await page.getByPlaceholder('Enter body').fill(body)

	// click the "Post" button
	await page.getByRole('button', { name: 'Post' }).click()

	await expect(page.getByText('Post successfully created.')).toBeVisible()

	// click the first "View Comments" button only (there should be only one)
	await page.getByRole('button', { name: 'View Comments' }).first().click()

	// check if the comments are visible
	await expect(page.getByRole('heading', { name: title })).toBeVisible()
}
