<script lang="ts">
	import { Alert, Button } from 'flowbite-svelte';
	import { SEO } from '$components';
</script>

<h1 class="text-xl text-primary">Svelte Template: Seline</h1>

<Button size="sm" color="red" class="mt-3 px-5">Submit</Button>
<Alert
	dismissable
	class="fixed left-1/2 top-0 w-full -translate-x-1/2 rounded-none bg-primary py-3 text-white"
>
	<span class="font-semibold">Submitted content successfully!</span>
</Alert>

<SEO
	title="Seline - Svelekit Template"
	description="Get started with seline using sveltekit and tailwind"
	type="WebSite"
	url="https://nux.nuxify.tech"
/>
