<script lang="ts">
	import { CountryDropdown } from '$components'
	import { Button, Input, Label } from 'flowbite-svelte'

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	let {
		loading = false,
		onRegister
	}: {
		loading?: boolean
		onRegister: (credentials: {
			name: string
			country: string
			email: string
			password: string
		}) => void
	} = $props()

	let step = $state<1 | 2>(1)
	let name = $state('')
	let country = $state('PH')
	let email = $state('')
	let password = $state('')
	let confirmPassword = $state('')
	let errors = $state<{
		name?: string
		email?: string
		password?: string
		confirmPassword?: string
	}>({})

	/**
	 * Moves to next step
	 */
	function nextStep(): void {
		errors = name.trim() ? {} : { name: 'Name is required.' }
		if (Object.keys(errors).length === 0) step = 2
	}

	/**
	 * Moves to previous step
	 */
	function previousStep(): void {
		errors = {}
		step = 1
	}

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
		} else if (password.length < 8) {
			errors.password = 'Password must be at least 8 characters.'
		}

		if (confirmPassword !== password) {
			errors.confirmPassword = 'Passwords do not match.'
		}

		if (Object.keys(errors).length === 0) {
			onRegister({ name, country, email, password })
		}
	}
</script>

<section>
	<div class="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
		<h1 class="mb-6 text-center text-2xl text-primary">Create an account</h1>

		<form
			class="flex flex-col gap-4"
			data-testid="register-form"
			onsubmit={(event) => {
				event.preventDefault()
				if (step === 1) nextStep()
				else submit()
			}}
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
				<div>
					<Label for="country" class="mb-1">Country</Label>
					<CountryDropdown bind:value={country} />
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
						onclick={previousStep}
					>
						<span class="lato--font-regular px-4">Back</span>
					</Button>

					<Button type="submit" class="mt-2 w-full rounded-full bg-primary" disabled={loading}>
						<span class="lato--font-regular px-4 text-white">
							{loading ? 'Creating account...' : 'Register'}
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
