<script>
	import { Alert } from 'flowbite-svelte'
	import { globalStore } from '$lib/application/service/store/global.store'
	import '../app.scss'
	import '../app.postcss'
</script>

<!-- alert -->
{#if $globalStore.showAlert}
	<Alert
		class="fixed left-1/2 top-0 z-[99999] w-full -translate-x-1/2 rounded-none text-white {$globalStore.alertVariant}"
		dismissable
	>
		{$globalStore.alertMessage}
	</Alert>
{/if}

<slot />
