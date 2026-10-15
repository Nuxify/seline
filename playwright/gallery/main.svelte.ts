import { mount, unmount, type Component } from 'svelte'
import '../../src/app.scss'
import '../../src/app.postcss'

const stories = import.meta.glob([
	'../../src/**/*.story.svelte',
	'../../tests/components/stories/**/*.story.svelte',
	'../../tests/stories/**/*.story.svelte'
])
const id = (f: string) =>
	f
		.replace(/^(\.\.\/)+(src|tests\/components\/stories|tests\/stories)\//, '')
		.replace(/\.story\.svelte$/, '')

async function resolve(storyId: string) {
	const file = Object.keys(stories).find((f) => id(f) === storyId || id(f).endsWith('/' + storyId))
	const mod = file ? ((await stories[file]()) as { default: Component<any> }) : undefined
	return mod?.default
}

const state = $state<{ props: Record<string, any> }>({ props: {} })
let current: { story: string; instance: Record<string, any> } | undefined
;(window as any).mount = async ({
	story,
	props
}: {
	story: string
	props?: Record<string, any>
}) => {
	// Same story: update reactive props in place so component state is preserved.
	if (current?.story === story) {
		state.props = props ?? {}
		return
	}
	const Story = await resolve(story)
	if (!Story) throw new Error(`Unknown story: ${story}`)
	if (current) await unmount(current.instance)
	state.props = props ?? {}
	const target = document.getElementById('root')!
	target.innerHTML = ''
	const instance = mount(Story, {
		target,
		props: new Proxy(
			{},
			{
				get: (_, key) => state.props[key as string],
				has: (_, key) => key in state.props,
				ownKeys: () => Reflect.ownKeys(state.props),
				getOwnPropertyDescriptor: (_, key) =>
					key in state.props
						? { enumerable: true, configurable: true, value: state.props[key as string] }
						: undefined
			}
		)
	})
	current = { story, instance }
}
;(window as any).unmount = async () => {
	if (current) await unmount(current.instance)
	current = undefined
}
