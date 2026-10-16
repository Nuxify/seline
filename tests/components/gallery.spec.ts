import { expect, test } from '@playwright/test'

test('browses stories from the gallery page', async ({ page }) => {
	await page.goto('/playwright/gallery/index.html')

	const storyList = page.getByRole('navigation', { name: 'Stories' })
	const commentStory = storyList.getByRole('button', { name: 'Comment' })
	await expect(commentStory).toHaveAttribute('aria-pressed', 'true')
	await expect(page.locator('#root').getByText('This is a comment')).toBeVisible()

	const loginStory = storyList.getByRole('button', { name: 'LoginForm' })
	await loginStory.click()
	await expect(loginStory).toHaveAttribute('aria-pressed', 'true')
	await expect(page.locator('#root').getByRole('heading', { name: 'Log in' })).toBeVisible()
})
