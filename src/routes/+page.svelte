<script lang="ts">
	import { Alert, Button } from 'flowbite-svelte';
	import { SEO } from '$components';
</script>

<h1 class="text-primary text-xl">Svelte Template: Seline</h1>

<Button size="sm" color="red" class="mt-3 px-5">Submit</Button>
<Alert
	dismissable
	class="fixed bottom-0 left-1/2 w-[99%] -translate-x-1/2 mb-2 bg-primary text-white"
>
	Submitted content successfully!
</Alert>

<SEO
	title="Seline - Svelekit Template"
	description="Get started with seline using sveltekit and tailwind"
	type="WebSite"
	url="https://nux.nuxify.tech"
/>