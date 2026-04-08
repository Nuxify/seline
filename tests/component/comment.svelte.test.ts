import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import Comment from '$lib/core/interfaces/components/Comment.svelte'

test('Comment', async () => {
	const user = userEvent.setup()
	render(Comment, { name: 'Seline', email: 'seline@test.com', body: 'This is a comment' })

	const name = screen.getByRole('heading', { level: 6 })
	expect(name.textContent).toContain('Seline')

	const email = screen.getByRole('heading', { level: 5 })
	expect(email.textContent).toContain('seline@test.com')

	const body = screen.getByRole('paragraph')
	expect(body.textContent).toEqual('This is a comment')
})
