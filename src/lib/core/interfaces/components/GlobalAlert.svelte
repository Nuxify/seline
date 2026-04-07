<script lang="ts">
	import { Alert } from 'flowbite-svelte'
	import { globalState } from '$lib/core/application/service/store/global.state.svelte'
</script>

{#if globalState.showAlert}
	<Alert
		class="fixed left-1/2 top-0 z-[99999] w-full -translate-x-1/2 rounded-none text-white {globalState.alertVariant}"
		dismissable
	>
		{globalState.alertMessage}
	</Alert>
{/if}
