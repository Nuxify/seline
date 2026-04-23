<script lang="ts">
	import { GlobalAlert } from '$components'
	import '../app.scss'
	import '../app.postcss'

	let { children } = $props()
</script>

<GlobalAlert />

{@render children?.()}
