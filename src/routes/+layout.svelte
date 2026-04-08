<script lang="ts">
	import { GlobalAlert } from '$components'
	import '../app.scss'
	import '../app.postcss'
	import { MessageStatus, type StateDTO } from '$lib/core/application/service/store/global.dto'
	import { setGlobalStateContext } from '$lib/core/application/service/store/global.context.svelte'

	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()

	// FOR TESTING PURPOSES: global state context test
	// let initialGlobalState:StateDTO = $state({
	// 	alertMessage: '',
	// 	alertVariant: MessageStatus.SUCCESS,
	// 	drawerMiniVariant: false,
	// 	showAlert: false,
	// 	isShowDrawer: false
	// })

	// setGlobalStateContext(initialGlobalState)
</script>

<GlobalAlert />

{@render children?.()}
