<script lang="ts">
	import { goto } from '$app/navigation'
	import { Button } from 'flowbite-svelte'
	import { getPostCommentsStore } from '$lib/core/application/service/store/social.api.store'
	import { homeStore } from '$lib/core/module/home/application/service/store/home.store'
	import { PostCard, SEO } from '$components'

	/**
	 * Back to main page
	 */
	function goBack(): void {
		goto('/')
	}
</script>

<section>
	<div class="mx-auto mt-[30px] px-4 xl:container">
		<Button
			class="ml-5 w-[100px] rounded-full"
			on:click={() => {
				goBack()
			}}
		>
			<span class="lato--font-regular px-4 text-primary"> Back </span>
		</Button>
		<h1 class="mt-10 text-center text-2xl text-primary">Post</h1>

		<PostCard post={$homeStore.selectedPost} showViewButton={false} />

		<h1 class="mt-10 text-center text-2xl text-primary">Comments</h1>

		<!-- comments list -->
		{#each $getPostCommentsStore.response.data as item}
			<div class="mb-7rounded-xl mx-auto my-2 w-3/4 rounded-lg border border-primary p-5">
				<h6>Name: {item.name}</h6>
				<h5 class="mb-2 text-sm font-medium lowercase tracking-tight text-gray-500 dark:text-white">
					{item.email}
				</h5>
				<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">{item.body}</p>
			</div>
		{/each}
	</div>
</section>

<SEO
	title={$homeStore.selectedPost.title}
	description={$homeStore.selectedPost.body}
	url={`https://seline.pages.dev/post/${$homeStore.selectedPost.id}`}
/>
