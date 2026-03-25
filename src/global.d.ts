// Global Svelte module declarations for TypeScript
// Allows importing `.svelte` components without implicit any.
declare module '*.svelte' {
	import { SvelteComponentTyped } from 'svelte'

	export default class Component<
		Props = any,
		Events = Record<string, any>,
		Slots = Record<string, any>
	> extends SvelteComponentTyped<Props, Events, Slots> {}
}
