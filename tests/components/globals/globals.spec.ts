import { test, expect } from '@playwright/test'
import { Countries } from '$lib/internal/types'

const id = Math.random() * 1000
const userId = Math.random() * 1000
const title = 'Seline'
const email = 'seline@test.com'
const body = 'This is a comment'

test.describe('Comment', () => {
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

test.describe('CountryDropdown', () => {
	test('renders on mount', async ({ mount }) => {
		const component = await mount('CountryDropdown')

		await expect(component.getByRole('combobox', { name: 'Country' })).toBeVisible()
	})

	test('shows country options and updates the selected country', async ({ mount }) => {
		const component = await mount('CountryDropdown')
		const country = component.getByRole('combobox', { name: 'Country' })

		await expect(country).toHaveValue('PH')
		await expect(country.locator('option')).toHaveText([
			'Choose option ...',
			...Object.values(Countries)
		])

		await country.selectOption('KO')
		await expect(component.getByTestId('selected-country')).toHaveValue('KO')
	})
})

test.describe('GlobalAlert', () => {
	test('renders on mount', async ({ mount }) => {
		const component = await mount('GlobalAlert')

		await expect(component.getByRole('alert')).toBeVisible()
	})

	test('displays and dismisses the alert', async ({ mount }) => {
		const component = await mount('GlobalAlert')
		const alert = component.getByRole('alert')

		await expect(alert).toContainText('Story alert message')
		await alert.getByRole('button').click()
		await expect(alert).toBeHidden()
	})
})

test.describe('PostCard', () => {
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
