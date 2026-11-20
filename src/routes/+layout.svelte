<script lang="ts">
	import { GlobalAlert } from '$components'
	import '../app.scss'
	import '../app.css'

	let { children } = $props()
</script>

<GlobalAlert />

{@render children?.()}
