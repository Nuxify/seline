<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { goto } from '$app/navigation'
	import { authAPI, registerStore } from '$lib/core/application/service/store/auth.api.store'
	import { globalStore } from '$lib/core/application/service/store/global.store'
	import { MessageStatus } from '$lib/core/application/service/store/global.dto'
	import { RegisterForm } from '$lib/core/module/auth/interfaces/components'
	import { SEO } from '$components'

	const subscriptions: Array<() => void> = []

	onMount(() => {
		// redirect already-authenticated users away from register
		if (authAPI.getSession()) {
			goto('/')
			return
		}

		const registerSubscription = authAPI.registerStore.subscribe((registerState) => {
			if (registerState.state.SUCCESS || registerState.state.FAILED) {
				globalStore.ShowAlert({
					message: registerState.response.message,
					variant: registerState.state.FAILED ? MessageStatus.ERROR : MessageStatus.SUCCESS
				})

				if (registerState.state.SUCCESS) {
					goto('/login')
				}
			}
		})

		subscriptions.push(registerSubscription)
	})

	onDestroy(() => {
		subscriptions.forEach((unsubscribe) => unsubscribe())
	})

	/**
	 * Register user
	 * @param credentials
	 */
	function register(credentials: {
		name: string
		country: string
		email: string
		password: string
	}): void {
		authAPI.registerStore.call(credentials)
	}
</script>

<RegisterForm loading={$registerStore.state.LOADING} onRegister={register} />

<SEO
	title="Seline - Register"
	description="Create your Seline account."
	url="https://seline.pages.dev/register"
/>
