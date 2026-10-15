<script lang="ts">
	import { Button, Input, Label } from 'flowbite-svelte'

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	let {
		loading = false,
		onLogin
	}: {
		loading?: boolean
		onLogin: (credentials: { email: string; password: string }) => void
	} = $props()

	let email = $state('')
	let password = $state('')
	let errors = $state<{ email?: string; password?: string }>({})

	/**
	 * Submits form
	 */
	function submit(): void {
		errors = {}

		if (!email.trim()) {
			errors.email = 'Email is required.'
		} else if (!emailPattern.test(email)) {
			errors.email = 'Enter a valid email address.'
		}

		if (!password) {
			errors.password = 'Password is required.'
		}

		if (Object.keys(errors).length === 0) {
			onLogin({ email, password })
		}
	}
</script>

<section>
	<div class="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
		<h1 class="mb-6 text-center text-2xl text-primary">Log in</h1>

		<form
			class="flex flex-col gap-4"
			data-testid="login-form"
			onsubmit={(event) => {
				event.preventDefault()
				submit()
			}}
		>
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

			<Button type="submit" class="mt-2 w-full rounded-full bg-primary" disabled={loading}>
				<span class="lato--font-regular px-4 text-white">
					{loading ? 'Logging in...' : 'Log in'}
				</span>
			</Button>
		</form>

		<p class="mt-4 text-center text-sm">
			Don't have an account?
			<a href="/register" class="text-primary underline">Register</a>
		</p>
	</div>
</section>
