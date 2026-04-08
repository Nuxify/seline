import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import Comment from '$lib/core/interfaces/components/Comment.svelte'

test('Comment', async () => {
	const user = userEvent.setup()
	render(Comment, { name: 'Seline' })

	const button = screen.getByRole('button')
	expect(button.textContent).toContain('Greet')

	await user.click(button)
	expect(button.textContent).toContain('Hello Seline')
})
