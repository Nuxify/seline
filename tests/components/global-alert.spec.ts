import { expect, test } from '@playwright/test'

test('displays and dismisses the alert', async ({ mount }) => {
	const component = await mount('GlobalAlert')
	const alert = component.getByRole('alert')

	await expect(alert).toContainText('Story alert message')
	await alert.getByRole('button').click()
	await expect(alert).toBeHidden()
})
