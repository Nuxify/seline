<script lang="ts">
	import { goto } from '$app/navigation'
	import { getPostCommentsStore } from '$lib/core/application/service/store/social.api.store'
	import { homeStore } from '$lib/core/module/home/application/service/store/home.store'
	import { Button, Card } from '$components/ui'
	import { SEO } from '$components/common'

	/**
	 * Back to main page
	 */
	function goBack(): void {
		goto('/')
	}
</script>

<section>
	<div class="mx-auto mt-[30px] space-y-4 px-4 xl:container">
		<Button
			variant="ghost"
			on:click={() => {
				goBack()
			}}
		>
			Back
		</Button>
		<h1 class="mt-10 text-center text-2xl text-primary">Post</h1>

		<Card.Root class="mx-auto w-3/4">
			<Card.Header>
				<Card.Title>ID: {$homeStore.selectedPost.id}</Card.Title>
				<Card.Title>{$homeStore.selectedPost.title}</Card.Title>
			</Card.Header>
			<Card.Content class="py-2">
				<Card.Description class="text-sm">{$homeStore.selectedPost.body}</Card.Description>
			</Card.Content>
		</Card.Root>

		<h1 class="mt-10 text-center text-2xl text-primary">Comments</h1>

		<!-- comments list -->
		{#each $getPostCommentsStore.response.data as item}
			<Card.Root class="mx-auto w-3/4">
				<Card.Header>
					<Card.Title>{item.name}</Card.Title>
				</Card.Header>
				<Card.Content class="py-3">
					<Card.Description class="mb-2">{item.email}</Card.Description>
					<Card.Description class="text-sm">{item.body}</Card.Description>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</section>

<SEO
	title={$homeStore.selectedPost.title}
	description={$homeStore.selectedPost.body}
	url={`https://seline.pages.dev/post/${$homeStore.selectedPost.id}`}
/>
