<script lang="ts">
	import { goto } from '$app/navigation'
	import { Button } from 'flowbite-svelte'
	import { socialAPI, getCommentsStore } from '$lib/infrastructures/service/store/social.store'
	import { homeStore } from '$lib/module/home/service/store/home.store'
	import { SEO } from '$components'

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

		<div class="mb-7rounded-xl mx-auto my-2 w-3/4 rounded-lg border border-primary p-5">
			<h6>ID: {$homeStore.selectedPost.id}</h6>
			<h5 class="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
				{$homeStore.selectedPost.title}
			</h5>
			<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
				{$homeStore.selectedPost.body}
			</p>
		</div>
		<h1 class="mt-10 text-center text-2xl text-primary">Comments</h1>

		<!-- comments list -->
		{#each $getCommentsStore.Response.data as item}
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

<SEO title={$homeStore.selectedPost.title} type="WebSite" url="https://seline.pages.dev" />
