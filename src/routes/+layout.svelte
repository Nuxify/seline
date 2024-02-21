<script>
	import '../app.scss'
	import '../app.postcss'
	import { Alert } from 'flowbite-svelte'
	import { globalStore } from '$lib/application/service/store/global.store'
</script>

<!-- alert -->
{#if $globalStore.showAlert}
	<Alert
		dismissable
		class="fixed left-1/2 top-0 w-full -translate-x-1/2 rounded-none bg-primary text-white"
	>
		{$globalStore.alertMessage}
	</Alert>
{/if}
<slot />
