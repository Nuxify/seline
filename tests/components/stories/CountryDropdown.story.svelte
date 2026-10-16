<script lang="ts">
	import { CountryDropdown } from '$lib/core/interfaces/components'

	let country = $state('PH')
</script>

<CountryDropdown bind:value={country} />
<input type="hidden" data-testid="selected-country" value={country} />
