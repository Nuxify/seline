<script lang="ts">
	import { GlobalAlert } from '$components'
	import '../app.scss'
	import '../app.postcss'

	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()
</script>

<GlobalAlert />

{@render children?.()}
