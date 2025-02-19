<script>
	import { globalStore } from '$lib/core/application/service/store/global.store'
	import { Alert } from '$components/ui'
	import '../app.scss'
	import '../app.postcss'
</script>

<!-- alert -->
{#if $globalStore.showAlert}
	<Alert.Root>
		<Alert.Description>
			{$globalStore.alertMessage}
		</Alert.Description>
	</Alert.Root>
{/if}

<slot />
