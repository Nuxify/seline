<script>
	import * as Alert from '$lib/components/ui/alert'
	import { globalStore } from '$lib/core/application/service/store/global.store'
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
