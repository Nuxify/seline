<script lang="ts">
	import { LoginForm } from '$lib/core/interfaces/components'

	let { loading = false }: { loading?: boolean } = $props()
	let submitted = $state('')
</script>

<LoginForm
	{loading}
	onLogin={(credentials) => {
		submitted = JSON.stringify(credentials)
	}}
/>

<input type="hidden" data-testid="submitted-credentials" value={submitted} />
