<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { goto } from '$app/navigation'
	import { authAPI, loginStore } from '$lib/core/application/service/store/auth.api.store'
	import { globalStore } from '$lib/core/application/service/store/global.store'
	import { MessageStatus } from '$lib/core/application/service/store/global.dto'
	import { LoginForm, SEO } from '$components'

	const subscriptions: Array<() => void> = []

	onMount(() => {
		// redirect already-authenticated users away from login
		if (authAPI.getSession()) {
			goto('/')
			return
		}

		const loginSubscription = authAPI.loginStore.subscribe((loginState) => {
			if (loginState.state.SUCCESS || loginState.state.FAILED) {
				globalStore.ShowAlert({
					message: loginState.response.message,
					variant: loginState.state.FAILED ? MessageStatus.ERROR : MessageStatus.SUCCESS
				})

				if (loginState.state.SUCCESS) {
					goto('/')
				}
			}
		})

		subscriptions.push(loginSubscription)
	})

	onDestroy(() => {
		subscriptions.forEach((unsubscribe) => unsubscribe())
	})

	/**
	 * Login user
	 * @param credentials
	 */
	function login(credentials: { email: string; password: string }): void {
		authAPI.loginStore.call(credentials)
	}
</script>

<LoginForm loading={$loginStore.state.LOADING} onLogin={login} />

<SEO
	title="Seline - Login"
	description="Log in to your Seline account."
	url="https://seline.pages.dev/login"
/>
