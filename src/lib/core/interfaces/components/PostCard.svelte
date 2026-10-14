<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import type { PostResponse } from '$lib/core/application/service/store/social.api.dto'

	let {
		post,
		showViewButton = true,
		viewComments = () => {}
	}: {
		post: PostResponse
		showViewButton?: boolean
		viewComments?: (post: PostResponse) => void
	} = $props()
</script>

<section
	data-testid="post-card"
	class="mx-auto my-2 mb-7 w-3/4 rounded-xl border border-primary p-5"
>
	<h6>ID: {post.id}</h6>
	<h5 class="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
		{post.title}
	</h5>
	<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">{post.body}</p>
	{#if showViewButton}
		<Button
			data-testid="view-comments-button"
			class="ml-auto mt-5 flex bg-primary focus:ring-0"
			on:click={() => {
				viewComments(post)
			}}
		>
			View Comments
		</Button>
	{/if}
</section>
