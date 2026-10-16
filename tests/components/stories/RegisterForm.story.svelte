<script lang="ts">
	import { RegisterForm } from '$lib/core/interfaces/components'

	let { loading = false }: { loading?: boolean } = $props()
	let submitted = $state('')
</script>

<RegisterForm
	{loading}
	onRegister={(credentials) => {
		submitted = JSON.stringify(credentials)
	}}
/>

<input type="hidden" data-testid="submitted-credentials" value={submitted} />
