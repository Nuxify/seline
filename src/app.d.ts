// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Svelte module declarations for TypeScript
// Allows importing `.svelte` components without implicit any.
declare module '*.svelte' {
	import { SvelteComponentTyped } from 'svelte'

	export default class Component<
		Props = any,
		Events = Record<string, any>,
		Slots = Record<string, any>
	> extends SvelteComponentTyped<Props, Events, Slots> {}
}

export {}
