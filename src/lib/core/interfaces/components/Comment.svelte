<script lang="ts">
	let { name, email, body } = $props()
</script>

<div class="mb-7rounded-xl mx-auto my-2 w-3/4 rounded-lg border border-primary p-5">
	<h6>Name: {name}</h6>
	<h5 class="mb-2 text-sm font-medium lowercase tracking-tight text-gray-500 dark:text-white">
		{email}
	</h5>
	<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">{body}</p>
</div>
