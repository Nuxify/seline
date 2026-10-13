<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { goto } from '$app/navigation'
	import { Button, Input, Label } from 'flowbite-svelte'
	import { authAPI, loginStore } from '$lib/core/application/service/store/auth.api.store'
	import { globalStore } from '$lib/core/application/service/store/global.store'
	import { MessageStatus } from '$lib/core/application/service/store/global.dto'
	import { SEO } from '$components'

	const subscriptions: Array<() => void> = []

	let email: string = ''
	let password: string = ''

	let errors: { email?: string; password?: string } = {}

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
	 * Validate the login form.
	 *
	 * @return {boolean} true if valid
	 */
	function validate(): boolean {
		errors = {}

		if (!email.trim()) {
			errors.email = 'Email is required.'
		} else if (!emailPattern.test(email)) {
			errors.email = 'Enter a valid email address.'
		}

		if (!password) {
			errors.password = 'Password is required.'
		}

		return Object.keys(errors).length === 0
	}

	/**
	 * Submit the login form.
	 */
	function login(): void {
		if (!validate()) {
			return
		}

		authAPI.loginStore.call({ email, password })
	}
</script>

<section>
	<div class="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
		<h1 class="mb-6 text-center text-2xl text-primary">Log in</h1>

		<form class="flex flex-col gap-4" data-testid="login-form" on:submit|preventDefault={login}>
			<div>
				<Label for="email" class="mb-1">Email</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder="Enter your email"
					bind:value={email}
					color={errors.email ? 'red' : 'base'}
				/>
				{#if errors.email}
					<p class="mt-1 text-sm text-error" data-testid="email-error">{errors.email}</p>
				{/if}
			</div>

			<div>
				<Label for="password" class="mb-1">Password</Label>
				<Input
					id="password"
					name="password"
					type="password"
					placeholder="Enter your password"
					bind:value={password}
					color={errors.password ? 'red' : 'base'}
				/>
				{#if errors.password}
					<p class="mt-1 text-sm text-error" data-testid="password-error">{errors.password}</p>
				{/if}
			</div>

			<Button
				type="submit"
				class="mt-2 w-full rounded-full bg-primary"
				disabled={$loginStore.state.LOADING}
			>
				<span class="lato--font-regular px-4 text-white">
					{$loginStore.state.LOADING ? 'Logging in...' : 'Log in'}
				</span>
			</Button>
		</form>

		<p class="mt-4 text-center text-sm">
			Don't have an account?
			<a href="/register" class="text-primary underline">Register</a>
		</p>
	</div>
</section>

<SEO
	title="Seline - Login"
	description="Log in to your Seline account."
	url="https://seline.pages.dev/login"
/>
