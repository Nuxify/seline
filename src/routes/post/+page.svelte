<script lang="ts">
	import { goto } from '$app/navigation'
	import { Button } from 'flowbite-svelte'
	import { getPostCommentsState } from '$lib/core/application/service/store/social.api.state.svelte'
	import { homeState } from '$lib/core/module/home/application/service/store/home.state.svelte'
	import { Comment, SEO } from '$components'

	/**
	 * Back to main page
	 */
	function goBack(): void {
		goto('/')
	}

	// FOR TESTING PURPOSES: global state context test
	// let globalStateContext = getGlobalStateContext()
	// $inspect("from page", globalStateContext)

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
			<h6>ID: {homeState.selectedPost.id}</h6>
			<h5 class="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
				{homeState.selectedPost.title}
			</h5>
			<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
				{homeState.selectedPost.body}
			</p>
		</div>
		<h1 class="mt-10 text-center text-2xl text-primary">Comments</h1>

		<!-- comments list -->
		{#each getPostCommentsState.response.data as item}
			<Comment
				name={item.name}
				email={item.email}
				body={item.body}
			/>
		{/each}
	</div>
</section>

<SEO
	title={homeState.selectedPost.title}
	description={homeState.selectedPost.body}
	url={`https://seline.pages.dev/post/${homeState.selectedPost.id}`}
/>
