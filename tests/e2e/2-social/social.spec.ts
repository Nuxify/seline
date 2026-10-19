import { test } from '@playwright/test'
import { createPost } from './social-function'

test('index page can create a post', async ({ page }) => {
	await createPost(page)
})
