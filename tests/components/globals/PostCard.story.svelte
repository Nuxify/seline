<script lang="ts">
	import type { PostResponse } from '$lib/core/application/service/store/social.api.dto'
	import { PostCard } from '$lib/core/interfaces/components'

	const post: PostResponse = {
		id: 42,
		userId: 7,
		title: 'Story post title',
		body: 'Story post body'
	}

	let {
		showViewButton = true
	}: {
		showViewButton?: boolean
	} = $props()
	let viewedPost = $state('')
</script>

<PostCard
	{post}
	{showViewButton}
	viewComments={(selectedPost) => {
		viewedPost = JSON.stringify(selectedPost)
	}}
/>

<input type="hidden" data-testid="viewed-post" value={viewedPost} />
