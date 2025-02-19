<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { goto } from '$app/navigation'
	import { Input } from '$lib/components/ui/input'
	import { Button } from '$lib/components/ui/button'
	import {
		socialAPI,
		createPostStore,
		getPostsStore
	} from '$lib/core/application/service/store/social.api.store'
	import { globalStore } from '$lib/core/application/service/store/global.store'
	import { MessageStatus } from '$lib/core/application/service/store/global.dto'
	import { homeStore } from '$lib/core/module/home/application/service/store/home.store'
	import type { Post } from '$lib/core/module/home/application/service/store/home.dto'
	import { SEO } from '$components'

	let title: string
	let body: string

	const subscriptions: Array<() => void> = []

	onMount(async () => {
		// watchers or subscribers should be here
		const createPostSubscription = socialAPI.createPostStore.subscribe((createPostState) => {
			if (createPostState.state.SUCCESS || createPostState.state.FAILED) {
				if (createPostState.state.SUCCESS) {
					title = ''
					body = ''
					console.log('New post id:', createPostState.response.data.id)
				}

				// show alert prompt
				globalStore.ShowAlert({
					message: createPostState.response.message,
					variant: createPostState.state.FAILED ? MessageStatus.ERROR : MessageStatus.SUCCESS
				})
			}
		})

		const getPostsSubscription = socialAPI.getPostsStore.subscribe((getPostsState) => {
			if (getPostsState.state.SUCCESS || getPostsState.state.FAILED) {
				console.log(getPostsState.response.message)
			}
		})

		subscriptions.push(createPostSubscription, getPostsSubscription)
	})

	onDestroy(() => {
		subscriptions.forEach((unsubscribe) => unsubscribe())
	})

	/**
	 * Create a post
	 */
	async function createPost(): Promise<void> {
		socialAPI.createPostStore.call({
			userId: 1,
			title,
			body
		})
	}

	/**
	 * View post comments
	 * @param pageId
	 */
	function viewComments(post: Post): void {
		homeStore.update((state) => {
			state.selectedPost = post
			return state
		})

		goto(`/post`)
	}
</script>

<section>
	<div class="mx-auto px-4 pt-[30px] xl:container">
		<h1 class="text-center text-2xl text-primary">Seline: Social Media</h1>
		<div class="mx-auto mb-7 mt-12 w-3/4">
			<h1 class="text-xl text-primary">Create a post</h1>
			<div class="flex flex-col items-center gap-2 md:flex-row">
				<Input bind:value={title} type="text" placeholder="Enter title" />
				<Input bind:value={body} type="text" placeholder="Enter body" />
				<Button
					disabled={$createPostStore.state.LOADING}
					on:click={() => {
						createPost()
					}}
				>
					Post
				</Button>
			</div>
		</div>

		<!-- posts list -->
		{#each $getPostsStore.response.data as post}
			<div class="mb-7rounded-xl mx-auto my-2 w-3/4 rounded-lg border border-primary p-5">
				<h6>ID: {post.id}</h6>
				<h5 class="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
					{post.title}
				</h5>
				<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">{post.body}</p>
				<Button
					class="ml-auto block"
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
