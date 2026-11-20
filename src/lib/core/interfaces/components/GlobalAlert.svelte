<script lang="ts">
	import { Alert } from 'flowbite-svelte'
	import { globalStore } from '#lib/core/application/service/store/global.store.ts'
</script>

{#if $globalStore.showAlert}
	<Alert
		class="fixed top-0 left-1/2 z-99999 w-full -translate-x-1/2 rounded-none text-white {$globalStore.alertVariant}"
		dismissable
	>
		{$globalStore.alertMessage}
	</Alert>
{/if}
