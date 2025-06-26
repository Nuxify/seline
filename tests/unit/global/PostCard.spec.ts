import { it, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import PostCard from '$lib/core/interfaces/components/PostCard.svelte'

const mockPost = {
	id: 1,
	userId: 1,
	title: 'Test Post',
	body: 'This is a test post body'
}

it('should load the component successfully', () => {
	const { getByText } = render(PostCard, {
		props: {
			post: mockPost,
			viewComments: () => {}
		}
	})

	expect(getByText('Test Post')).toBeDefined()
})
