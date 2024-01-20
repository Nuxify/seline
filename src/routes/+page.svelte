<script lang="ts">
	import { Alert, Button, Input } from 'flowbite-svelte';
	import { SEO } from '$components';

	export let data;
</script>

<!-- <Button size="sm" color="red" class="mt-3 px-5">Submit</Button> -->
<!-- <Alert
	dismissable
	class="fixed bottom-0 left-1/2 mb-2 w-[99%] -translate-x-1/2 bg-primary text-white"
>
	Submitted content successfully!
</Alert> -->

<section>
	<div class="mx-auto mt-[30px] px-4 xl:container">
		<h1 class="text-center text-2xl text-primary">Seline: Social Media</h1>
		<div class="w-3/4">
			<h1 class="text-xl text-primary">Create a post</h1>
			<div class="flex flex-col items-center md:flex-row">
				<Input
					type="email"
					placeholder="Enter comment"
					class="md:border--radius-l-full w-full rounded-full border-none bg-gray-100 !ring-transparent md:w-64"
				/>
				<Button class="btn--primary mt-3 w-full rounded-full md:ml-[-30px] md:mt-0 md:w-auto">
					<span class="lato--font-regular text-white"> Post </span>
				</Button>
			</div>
		</div>
		{#each data.posts as item}
			<div class="mb-7rounded-xl mx-auto w-3/4 border border-primary p-5 rounded-lg my-2">
				<h6>ID: {item.id}</h6>
				<h5 class="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
					{item.title}
				</h5>
				<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">{item.body}</p>
				<Button class="ml-auto mt-5 flex bg-primary focus:ring-0">View Comments</Button>
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
