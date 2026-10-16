<script lang="ts">
	import { Countries } from '$lib/internal/types'
	import { Select } from 'flowbite-svelte'

	let { value = $bindable('PH') } = $props()
</script>

<Select id="country" bind:value aria-label="Country" class="w-full ">
	{#each Object.entries(Countries) as [code, name] (code)}
		<option value={code}>{name}</option>
	{/each}
</Select>
