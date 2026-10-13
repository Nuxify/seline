<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { authAPI } from '$lib/core/application/service/store/auth.api.store'
	import { SEO } from '$components'

	let session: ReturnType<typeof authAPI.getSession> = null
	let checked = false

	onMount(() => {
		session = authAPI.getSession()

		// route guard: redirect unauthenticated users to /login
		if (!session) {
			goto('/login')
			return
		}

		checked = true
	})
</script>

{#if checked && session}
	<section>
		<div class="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
			<h1 class="mb-6 text-center text-2xl text-primary">Profile</h1>
			<p class="text-center" data-testid="profile-name">Name: {session.name}</p>
			<p class="text-center" data-testid="profile-email">Email: {session.email}</p>
			<a href="/" class="mt-4 text-center text-primary underline">Back home</a>
		</div>
	</section>
{/if}

<SEO
	title="Seline - Profile"
	description="Your Seline profile."
	url="https://seline.pages.dev/profile"
/>
