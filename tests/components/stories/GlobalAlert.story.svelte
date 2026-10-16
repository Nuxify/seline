<script lang="ts">
	import { onMount } from 'svelte'
	import { GlobalAlert } from '$lib/core/interfaces/components'
	import { globalStore } from '$lib/core/application/service/store/global.store'
	import { MessageStatus } from '$lib/core/application/service/store/global.dto'

	onMount(() => {
		globalStore.ShowAlert({ message: 'Story alert message', variant: MessageStatus.SUCCESS }, 60000)
	})
</script>

<GlobalAlert />
