<script lang="ts">
	import Comment from './Comment.svelte'

	let {
		name = 'Seline',
		email = 'seline@test.com',
		body = 'This is a comment'
	}: { name?: string; email?: string; body?: string } = $props()
</script>

<Comment {name} {email} {body} />
