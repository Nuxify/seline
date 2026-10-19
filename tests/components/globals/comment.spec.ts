import { test, expect } from '@playwright/test'

test.describe('Comment', () => {
	const title = 'Seline'
	const email = 'seline@test.com'
	const body = 'This is a comment'

	test('renders on mount', async ({ mount }) => {
		const component = await mount('Comment')

		await expect(component.getByRole('paragraph')).toBeVisible()
	})

	test('renders comment details', async ({ mount }) => {
		const component = await mount('Comment')
		await expect(component.getByRole('heading', { level: 6 })).toContainText(title)
		await expect(component.getByRole('heading', { level: 5 })).toHaveText(email)
		await expect(component.getByRole('paragraph')).toHaveText(body)
	})

	test('accepts props and update()', async ({ mount }) => {
		const component = await mount('Comment', { body: 'First' })
		await expect(component.getByRole('paragraph')).toHaveText('First')
		await component.update({ body: 'Second' })
		await expect(component.getByRole('paragraph')).toHaveText('Second')
	})
})
