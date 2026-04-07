<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import { Button, Input } from 'flowbite-svelte'
	import {
		socialAPI,
		createPostState,
		getPostsState
	} from '$lib/core/application/service/store/social.api.state.svelte'
	import { ShowAlert } from '$lib/core/application/service/store/global.state.svelte'
	import { MessageStatus } from '$lib/core/application/service/store/global.dto'
	import { homeState } from '$lib/core/module/home/application/service/store/home.state.svelte'
	import type { Post } from '$lib/core/module/home/application/service/store/home.dto'
	import { SEO } from '$components'

	let title: string = $state('')
	let body: string = $state('')

	// TODO: centralize this effect
	$effect(() => {
		if (!browser) return
		const { SUCCESS, FAILED } = createPostState.state
		if (!SUCCESS && !FAILED) return

		if (SUCCESS) {
			title = ''
			body = ''
			console.log('New post id:', createPostState.response.data.id)
		}

		ShowAlert({
			message: createPostState.response.message,
			variant: FAILED ? MessageStatus.ERROR : MessageStatus.SUCCESS
		})
	})

	/**
	 * Create a post
	 */
	async function createPost(): Promise<void> {
		socialAPI.createPostStore.call({
			userId: 1,
			title: title,
			body: body
		})
	}

	/**
	 * View post comments
	 * @param pageId
	 */
	function viewComments(post: Post): void {
		homeState.selectedPost = post
		goto(`/post`)
	}
</script>

<section>
	<div class="mx-auto px-4 pt-[30px] xl:container">
		<h1 class="text-center text-2xl text-primary">Seline: Social Media</h1>
		<div class="mx-auto mb-7 mt-12 w-3/4">
			<h1 class="text-xl text-primary">Create a post</h1>
			<div class="flex flex-col items-center md:flex-row">
				<Input
					bind:value={title}
					type="text"
					placeholder="Enter title"
					class="md:border--radius-l-full mr-5 w-full rounded-full border-none bg-gray-100 !ring-transparent"
				/>
				<Input
					bind:value={body}
					type="text"
					placeholder="Enter body"
					class="md:border--radius-l-full w-full rounded-full border-none bg-gray-100 !ring-transparent"
				/>
				<Button
					class="ml-5 w-[100px] rounded-full bg-primary"
					disabled={createPostState.state.LOADING}
					on:click={() => {
						createPost()
					}}
				>
					<span class="lato--font-regular px-4 text-white"> Post </span>
				</Button>
			</div>
		</div>

		<!-- posts list -->
		{#each getPostsState.response.data as post}
			<div class="mb-7rounded-xl mx-auto my-2 w-3/4 rounded-lg border border-primary p-5">
				<h6>ID: {post.id}</h6>
				<h5 class="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
					{post.title}
				</h5>
				<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">{post.body}</p>
				<Button
					class="ml-auto mt-5 flex bg-primary focus:ring-0"
					on:click={() => {
						viewComments(post)
					}}
				>
					View Comments
				</Button>
			</div>
		{/each}
	</div>
</section>

<SEO
	title="Seline - SvelteKit Template"
	description="SvelteKit template for building modern and blazing fast webapps. Flowbite/Tailwind included."
	url="https://seline.pages.dev"
/>
