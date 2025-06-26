<script lang="ts">
	import { Button } from 'flowbite-svelte'
	import type { PostResponse } from '$lib/core/application/service/store/social.api.dto'

	export let post: PostResponse
	export let showViewButton: boolean = true
	export let viewComments: (post: PostResponse) => void = () => {}
</script>

<section class="mb-7rounded-xl mx-auto my-2 w-3/4 rounded-lg border border-primary p-5">
	<h6>ID: {post.id}</h6>
	<h5 class="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
		{post.title}
	</h5>
	<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">{post.body}</p>
	{#if showViewButton}
		<Button
			class="ml-auto mt-5 flex bg-primary focus:ring-0"
			on:click={() => {
				viewComments(post)
			}}
		>
			View Comments
		</Button>
	{/if}
</section>
