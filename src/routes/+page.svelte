<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { goto } from '$app/navigation'
	import { Button, Input } from 'flowbite-svelte'
	import {
		socialAPI,
		createPostStore,
		getPostsStore
	} from '#lib/core/application/service/store/social.api.store.ts'
	import { globalStore } from '#lib/core/application/service/store/global.store.ts'
	import { MessageStatus } from '#lib/core/application/service/store/global.dto.ts'
	import { homeStore } from '#lib/core/module/home/application/service/store/home.store.ts'
	import type { Post } from '#lib/core/module/home/application/service/store/home.dto.ts'
	import { SEO } from '$components'

	const subscriptions: Array<() => void> = []

	let title: string
	let body: string

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
	function createPost(): void {
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
	<div class="mx-auto px-4 pt-7.5 xl:container">
		<h1 class="text-primary text-center text-2xl">Seline: Social Media</h1>
		<div class="mx-auto mt-12 mb-7 w-3/4">
			<h1 class="text-primary text-xl">Create a post</h1>
			<div class="flex flex-col items-center md:flex-row">
				<Input
					bind:value={title}
					type="text"
					placeholder="Enter title"
					class="mr-5 w-full rounded-full! border-none bg-gray-100 px-5 ring-transparent!"
				/>
				<Input
					bind:value={body}
					type="text"
					placeholder="Enter body"
					class="w-full rounded-full! border-none bg-gray-100 px-5 ring-transparent!"
				/>
				<Button
					class="bg-primary ml-5 w-25 rounded-full"
					disabled={$createPostStore.state.LOADING}
					onclick={() => {
						createPost()
					}}
				>
					<span class="px-4 text-white"> Post </span>
				</Button>
			</div>
		</div>

		<!-- posts list -->
		{#each $getPostsStore.response.data as post}
			<div class="border-primary mx-auto my-2 mb-7 w-3/4 rounded-xl border p-5">
				<h6>ID: {post.id}</h6>
				<h5 class="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
					{post.title}
				</h5>
				<p class="leading-tight font-normal text-gray-700 dark:text-gray-400">{post.body}</p>
				<Button
					class="bg-primary mt-5 ml-auto flex focus:ring-0"
					onclick={() => {
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
