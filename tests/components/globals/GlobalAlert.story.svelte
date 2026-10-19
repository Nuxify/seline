<script lang="ts">
	import { onMount } from 'svelte'
	import { globalStore } from '$lib/core/application/service/store/global.store'
	import { MessageStatus } from '$lib/core/application/service/store/global.dto'
	import { GlobalAlert } from '$lib/core/interfaces/components'

	onMount(() => {
		globalStore.ShowAlert({ message: 'Story alert message', variant: MessageStatus.SUCCESS }, 60000)
	})
</script>

<GlobalAlert />
