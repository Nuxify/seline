import { expect, test } from '@playwright/test'

test('index page can create a post', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('heading', { name: 'Seline: Social Media' })).toBeVisible()

	// fill the title input
	await page.getByPlaceholder('Enter title').fill('Test Post Title')

	// fill the body input
	await page.getByPlaceholder('Enter body').fill('This is a test post body content')

	// click the "Post" button
	await page.getByRole('button', { name: 'Post' }).click()

	// click the first "View Comments" button only (there should be only one)
	await page.getByRole('button', { name: 'View Comments' }).first().click()

	// check if the comments are visible
	await expect(page.getByRole('heading', { name: 'Post' })).toBeVisible()
})
