<script lang="ts">
	import { Alert, Button, Card } from 'flowbite-svelte';
	import { SEO } from '$components';
</script>

	export let data;
</script>

<!-- <Button size="sm" color="red" class="mt-3 px-5">Submit</Button>
<Alert
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
		</div>
		{#each data.posts as item}
			<div class="mb-7rounded-xl mx-auto w-3/4 border border-primary p-5">
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
