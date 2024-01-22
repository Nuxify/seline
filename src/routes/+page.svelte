<script lang="ts">
	import { Alert, Button, Input } from 'flowbite-svelte';
	import { SEO } from '$components';
	import selectedPostId from '../stores/comments';
	import { goto } from '$app/navigation';

	export let data;
	let title: string;
	let body: string;
	let isLoading: boolean = false;
	let isShowAlert: boolean = false;

	/**
	 * View post comments
	 * @param id
	 */
	function viewComments(id: number): void {
		selectedPostId.set(id);

		goto(`/post`);
	}

	/**
	 * Create a post
	 */
	async function createPost(): Promise<void> {
		isLoading = true;
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
				method: 'POST',
				body: JSON.stringify({ title, body }),
				headers: { 'Content-Type': 'application/json' }
			});
			if (response.ok) {
				const responseData = await response.json();

				data.posts.unshift(responseData);
				data.posts = data.posts.slice();

				title = '';
				body = '';
				// Alert prompt
				isShowAlert = true;
				setTimeout(() => {
					isShowAlert = false;
				}, 3000);
			}
		} catch (error) {
			console.error(error);
		}
		isLoading = false;
	}
</script>

{#if isShowAlert}
	<Alert
		dismissable
		class="fixed left-1/2 top-0 w-full -translate-x-1/2 rounded-none bg-primary text-white"
	>
		Created a post successfully!
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
					disabled={isLoading}
					on:click={() => {
						createPost();
					}}
				>
					<span class="lato--font-regular px-4 text-white"> Post </span>
				</Button>
			</div>
		</div>
		{#each data.posts as item}
			<div class="mb-7rounded-xl mx-auto my-2 w-3/4 rounded-lg border border-primary p-5">
				<h6>ID: {item.id}</h6>
				<h5 class="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
					{item.title}
				</h5>
				<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">{item.body}</p>
				<Button
					class="ml-auto mt-5 flex bg-primary focus:ring-0"
					on:click={() => {
						viewComments(item.id);
					}}
				>
					View Comments
				</Button>
			</div>
		{/each}
	</div>
</section>

<SEO
	title="Seline - Svelekit Template"
	description="Get started with seline using sveltekit and tailwind"
	type="WebSite"
	url="https://nux.nuxify.tech"
/>
