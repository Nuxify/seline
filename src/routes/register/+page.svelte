<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { goto } from '$app/navigation'
	import { Button, Input, Label } from 'flowbite-svelte'
	import { authAPI, registerStore } from '$lib/core/application/service/store/auth.api.store'
	import { globalStore } from '$lib/core/application/service/store/global.store'
	import { MessageStatus } from '$lib/core/application/service/store/global.dto'
	import { SEO } from '$components'

	const subscriptions: Array<() => void> = []

	let step: 1 | 2 = 1

	let name: string = ''
	let email: string = ''
	let password: string = ''
	let confirmPassword: string = ''

	let errors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {}

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
	 * Validate step 1 of the registration form (name).
	 *
	 * @return {boolean} true if valid
	 */
	function validateStep1(): boolean {
		errors = {}

		if (!name.trim()) {
			errors.name = 'Name is required.'
		}

		return Object.keys(errors).length === 0
	}

	/**
	 * Validate step 2 of the registration form (email & password).
	 *
	 * @return {boolean} true if valid
	 */
	function validateStep2(): boolean {
		errors = {}

		if (!email.trim()) {
			errors.email = 'Email is required.'
		} else if (!emailPattern.test(email)) {
			errors.email = 'Enter a valid email address.'
		}

		if (!password) {
			errors.password = 'Password is required.'
		} else if (password.length < 8) {
			errors.password = 'Password must be at least 8 characters.'
		}

		if (confirmPassword !== password) {
			errors.confirmPassword = 'Passwords do not match.'
		}

		return Object.keys(errors).length === 0
	}

	/**
	 * Move to the next step after validating the current one.
	 */
	function nextStep(): void {
		if (!validateStep1()) {
			return
		}

		errors = {}
		step = 2
	}

	/**
	 * Go back to the previous step.
	 */
	function previousStep(): void {
		errors = {}
		step = 1
	}

	/**
	 * Submit the registration form.
	 */
	function register(): void {
		if (!validateStep2()) {
			return
		}

		authAPI.registerStore.call({ name, email, password })
	}
</script>

<section>
	<div class="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
		<h1 class="mb-6 text-center text-2xl text-primary">Create an account</h1>

		<form
			class="flex flex-col gap-4"
			data-testid="register-form"
			on:submit|preventDefault={step === 1 ? nextStep : register}
		>
			{#if step === 1}
				<div>
					<Label for="name" class="mb-1">Name</Label>
					<Input
						id="name"
						name="name"
						type="text"
						placeholder="Enter your name"
						bind:value={name}
						color={errors.name ? 'red' : 'base'}
					/>
					{#if errors.name}
						<p class="mt-1 text-sm text-error" data-testid="name-error">{errors.name}</p>
					{/if}
				</div>

				<Button type="submit" class="mt-2 w-full rounded-full bg-primary">
					<span class="lato--font-regular px-4 text-white">Next</span>
				</Button>
			{:else}
				<div>
					<Label for="email" class="mb-1">Email</Label>
					<Input
						id="email"
						name="email"
						type="text"
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

				<div>
					<Label for="confirmPassword" class="mb-1">Confirm Password</Label>
					<Input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						placeholder="Confirm your password"
						bind:value={confirmPassword}
						color={errors.confirmPassword ? 'red' : 'base'}
					/>
					{#if errors.confirmPassword}
						<p class="mt-1 text-sm text-error" data-testid="confirm-password-error">
							{errors.confirmPassword}
						</p>
					{/if}
				</div>

				<div class="flex gap-2">
					<Button
						type="button"
						color="alternative"
						class="mt-2 w-full rounded-full"
						on:click={previousStep}
					>
						<span class="lato--font-regular px-4">Back</span>
					</Button>

					<Button
						type="submit"
						class="mt-2 w-full rounded-full bg-primary"
						disabled={$registerStore.state.LOADING}
					>
						<span class="lato--font-regular px-4 text-white">
							{$registerStore.state.LOADING ? 'Creating account...' : 'Register'}
						</span>
					</Button>
				</div>
			{/if}
		</form>

		<p class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/login" class="text-primary underline">Log in</a>
		</p>
	</div>
</section>

<SEO
	title="Seline - Register"
	description="Create your Seline account."
	url="https://seline.pages.dev/register"
/>

