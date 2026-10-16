import { expect, test } from '@playwright/test'

test('renders post details and reports the selected post', async ({ mount }) => {
	const component = await mount('PostCard')

	await expect(component.getByTestId('post-card')).toContainText('ID: 42') //
	await expect(component.getByRole('heading', { level: 5 })).toHaveText('Story post title')
	await expect(component.getByRole('paragraph')).toHaveText('Story post body')

	await component.getByRole('button', { name: 'View Comments' }).click()
	await expect(component.getByTestId('viewed-post')).toHaveValue(
		'{"id":42,"userId":7,"title":"Story post title","body":"Story post body"}'
	)
})
