<script lang="ts">
	import { Alert, Button, CloseButton } from 'flowbite-svelte';
	import { SEO } from '$components';

	let alert: boolean = true;
</script>

<h1 class="text-xl text-primary">Svelte Template: Seline</h1>

<Button size="sm" color="red" class="mt-3 px-5">Submit</Button>

{#if alert}
	<Alert class="fixed left-1/2 top-0 w-full -translate-x-1/2 rounded-none bg-primary py-3 ">
		<div class="flex items-center justify-between">
			<span class="font-semibold text-white">Submitted content successfully!</span>
			<CloseButton
				class="text-white hover:bg-white hover:bg-opacity-20"
				on:click={() => (alert = false)}
			/>
		</div>
	</Alert>
{/if}

<SEO
	title="Seline - Svelekit Template"
	description="Get started with seline using sveltekit and tailwind"
	type="WebSite"
	url="https://nux.nuxify.tech"
/>
