import { expect, test } from '@playwright/test'

test.describe('PostCard', () => {
	const id = 42
	const userId = 7
	const title = 'Story post title'
	const body = 'Story post body'

	test('renders on mount', async ({ mount }) => {
		const component = await mount('PostCard')

		await expect(component.getByRole('heading', { name: title })).toBeVisible()
	})

	test('renders post details and reports the selected post', async ({ mount }) => {
		const component = await mount('PostCard', { id, userId, title, body })

		// verify that the post details are rendered correctly
		await expect(component.getByRole('heading', { level: 6 })).toHaveText(`ID: ${id}`)
		await expect(component.getByRole('heading', { level: 5 })).toHaveText(title)
		await expect(component.getByRole('paragraph')).toHaveText(body)

		// click the "View Comments" button and verify the selected post is reported
		await component.getByRole('button', { name: 'View Comments' }).click()
		await expect(component.getByTestId('viewed-post')).toHaveValue(
			`{"id":${id},"userId":${userId},"title":"${title}","body":"${body}"}`
		)
	})

	test('hides the comments action when disabled', async ({ mount }) => {
		const component = await mount('PostCard', { showViewButton: false })

		// verify that the "View Comments" button is not rendered and the viewed post is empty
		await expect(component.getByRole('button', { name: 'View Comments' })).toHaveCount(0)
		await expect(component.getByTestId('viewed-post')).toHaveValue('')
	})
})
