import { test, expect } from '@playwright/test'

test('renders comment details', async ({ mount }) => {
	const component = await mount('Comment')
	await expect(component.getByRole('heading', { level: 6 })).toContainText('Seline')
	await expect(component.getByRole('heading', { level: 5 })).toHaveText('seline@test.com')
	await expect(component.getByRole('paragraph')).toHaveText('This is a comment')
})

test('accepts props and update()', async ({ mount }) => {
	const component = await mount('Comment', { body: 'First' })
	await expect(component.getByRole('paragraph')).toHaveText('First')
	await component.update({ body: 'Second' })
	await expect(component.getByRole('paragraph')).toHaveText('Second')
})
