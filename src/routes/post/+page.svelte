<script lang="ts">
	import { goto } from '$app/navigation'
	import { Button } from 'flowbite-svelte'
	import { getPostCommentsStore } from '#lib/core/application/service/store/social.api.store.ts'
	import { homeStore } from '#lib/core/module/home/application/service/store/home.store.ts'
	import { Comment, SEO } from '$components'

	/**
	 * Back to main page
	 */
	function goBack(): void {
		goto('/')
	}
</script>

<section>
	<div class="mx-auto mt-7.5 px-4 xl:container">
		<Button
			class="ml-5 w-25 rounded-full"
			onclick={() => {
				goBack()
			}}
		>
			<span class="text-primary px-4"> Back </span>
		</Button>
		<h1 class="text-primary mt-10 text-center text-2xl">Post</h1>

		<div class="border-primary mx-auto my-2 mb-7 w-3/4 rounded-xl border p-5">
			<h6>ID: {$homeStore.selectedPost.id}</h6>
			<h5 class="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
				{$homeStore.selectedPost.title}
			</h5>
			<p class="leading-tight font-normal text-gray-700 dark:text-gray-400">
				{$homeStore.selectedPost.body}
			</p>
		</div>
		<h1 class="text-primary mt-10 text-center text-2xl">Comments</h1>

		<!-- comments list -->
		{#each $getPostCommentsStore.response.data as item}
			<Comment name={item.name} email={item.email} body={item.body} />
		{/each}
	</div>
</section>

<SEO
	title={$homeStore.selectedPost.title}
	description={$homeStore.selectedPost.body}
	url={`https://seline.pages.dev/post/${$homeStore.selectedPost.id}`}
/>
