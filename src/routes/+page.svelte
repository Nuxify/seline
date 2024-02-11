<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { Alert, Button, Input } from 'flowbite-svelte'
	import { socialAPIStore } from '$lib/infrastructures/service/store/social.store'
	import { globalStore } from '$lib/infrastructures/service/store/global.store'
	import { homeStore } from '$lib/module/home/service/store/home.store'
	import type { Post } from '$lib/module/home/service/store/home.dto'
	import { SEO } from '$components'

	let title: string
	let body: string

	onMount(async () => {
		// watchers or subscribers should be here
		// below is an example to print the get posts response message when call is success
		socialAPIStore.subscribe((state) => {
			if (state.CreatePostState.SUCCESS || state.CreatePostState.FAILED) {
				if (state.CreatePostState.SUCCESS) {
					console.log('New post id:', state.CreatePostResponse.data.id)
				}

				globalStore.update((globalState) => {
					globalState.alertMessage = state.CreatePostResponse.message
					return globalState
				})
			}

			if (state.GetPostsState.SUCCESS || state.GetPostsState.FAILED) {
				console.log(state.PostsResponse.message)
			}
		})
	})

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

	/**
	 * Create a post
	 */
	async function createPost(): Promise<void> {
		try {
			await socialAPIStore.CreatePost({
				title,
				body
			})

			// show alert prompt
			globalStore.update((state) => {
				state.showAlert = true
				return state
			})
			setTimeout(() => {
				globalStore.update((state) => {
					state.showAlert = false
					return state
				})
			}, 3000)
		} catch (error) {
			console.error(error)
		}

		// reset
		title = ''
		body = ''
	}
</script>

<!-- TODO: move to layout -->
{#if $globalStore.showAlert}
	<Alert
		dismissable
		class="fixed left-1/2 top-0 w-full -translate-x-1/2 rounded-none bg-primary text-white"
	>
		{$globalStore.alertMessage}
	</Alert>
{/if}

<section>
	<div class="mx-auto mt-[30px] px-4 xl:container">
		<h1 class="text-center text-2xl text-primary">Seline: Social Media</h1>
		<div class="mx-auto mb-7 mt-12 w-3/4">
			<h1 class="text-xl text-primary">Create a post</h1>
			<div class="flex flex-col items-center md:flex-row">
				<Input
					bind:value={title}
					type="text"
					placeholder="Enter title"
					class="md:border--radius-l-full mr-5 w-full w-full rounded-full border-none bg-gray-100 !ring-transparent"
				/>
				<Input
					bind:value={body}
					type="text"
					placeholder="Enter body"
					class="md:border--radius-l-full w-full w-full rounded-full border-none bg-gray-100 !ring-transparent"
				/>
				<Button
					class="btn--primary ml-5 w-[100px] rounded-full"
					disabled={$socialAPIStore.CreatePostState.LOADING}
					on:click={() => {
						createPost()
					}}
				>
					<span class="lato--font-regular px-4 text-white"> Post </span>
				</Button>
			</div>
		</div>

		<!-- posts list -->
		{#each $socialAPIStore.PostsResponse.data as post}
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
	type="WebSite"
	url="https://nuxify.tech"
/>
