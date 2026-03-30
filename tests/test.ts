import { expect, test } from '@playwright/test'

test('index page has expected h1', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('heading', { name: 'Seline: Social Media' })).toBeVisible()
})

test('inputs are cleared after creating post', async ({ page }) => {
	await page.goto('/')

	// fill inputs
	await page.getByPlaceholder('Enter title').fill('E2E Test Title')
	await page.getByPlaceholder('Enter body').fill('E2E Test Body')

	// click Post
	await page.getByRole('button', { name: 'Post' }).click()

	// after successful, the form fields should be cleared
	await expect(page.getByPlaceholder('Enter title')).toHaveValue('')
	await expect(page.getByPlaceholder('Enter body')).toHaveValue('')
})

test('view comments navigates to post page and shows selected post', async ({ page }) => {
	await page.goto('/')

	const firstPostTitle = (await page.locator('h5').first().textContent()) || ''

	// click View Comments for the first post
	await page.getByRole('button', { name: 'View Comments' }).first().click()

	// should navigate to /post and show heading "Post"
	await expect(page).toHaveURL(/\/post$/)
	await expect(page.getByRole('heading', { name: 'Post' })).toBeVisible()

	// the post title should be visible
	await expect(page.locator('h5')).toContainText(firstPostTitle)
})
