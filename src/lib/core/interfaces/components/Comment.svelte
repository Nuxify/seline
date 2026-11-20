<script lang="ts">
	let { name, email, body } = $props()
</script>

<div class="border-primary mx-auto my-2 mb-7 w-3/4 rounded-xl border p-5">
	<h6>Name: {name}</h6>
	<h5 class="mb-2 text-sm font-medium tracking-tight text-gray-500 lowercase dark:text-white">
		{email}
	</h5>
	<p class="leading-tight font-normal text-gray-700 dark:text-gray-400">{body}</p>
</div>
