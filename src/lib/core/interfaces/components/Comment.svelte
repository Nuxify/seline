<script lang="ts">
  let {name} = $props()

  let showGreeting:boolean = $state(false)

  const onclick = () => (showGreeting = true)
</script>

<button {onclick}>
    {#if showGreeting}
<p>Hello {name}</p>
{:else}
    Greet
{/if}</button>

