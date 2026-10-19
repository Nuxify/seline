/// <reference types="vite/client" />

import { mount, unmount, type Component } from 'svelte'
import '../../src/app.scss'
import '../../src/app.postcss'

type StoryProps = Record<string, unknown>
type StoryModule = { default: Component<StoryProps> }
type StoryMountParams = { story: string; props?: StoryProps }

declare global {
	interface Window {
		mount: (params: StoryMountParams) => Promise<void>
		unmount: () => Promise<void>
	}
}

const stories = import.meta.glob<StoryModule>([
	'../../src/**/*.story.svelte',
	'../../tests/components/**/*.story.svelte',
	'../../tests/stories/**/*.story.svelte'
])
const id = (f: string) =>
	f
		.replace(/^(\.\.\/)+(src|tests\/components(?:\/[^/]+)*|tests\/stories)\//, '')
		.replace(/\.story\.svelte$/, '')
const storyIds = [...new Set(Object.keys(stories).map((file) => id(file)))].sort()

const storyList = document.getElementById('story-list')!
const storyTitle = document.getElementById('story-title')!
const galleryError = document.getElementById('gallery-error')!
const storyButtons = new Map<string, HTMLButtonElement>()

const state = $state<{ props: StoryProps }>({ props: {} })

let current: { story: string; storyFile: string; instance: ReturnType<typeof mount> } | undefined
let mountRequest = 0

/**
 * Sets selected story
 * @param storyId
 */
function setSelectedStory(storyId: string) {
	storyTitle.textContent = storyId
	for (const [id, button] of storyButtons) {
		button.setAttribute('aria-pressed', String(id === storyId))
	}
}

/**
 * Shows an error message in the gallery
 * @param error
 */
function showError(error: unknown) {
	galleryError.textContent = error instanceof Error ? error.message : String(error)
	galleryError.hidden = false
}

for (const storyId of storyIds) {
	const button = document.createElement('button')
	button.type = 'button'
	button.className = 'story-button'
	button.textContent = storyId
	button.setAttribute('aria-pressed', 'false')
	button.addEventListener('click', () => {
		void window.mount({ story: storyId }).catch(showError)
	})
	storyButtons.set(storyId, button)
	storyList.append(button)
}

if (storyIds.length === 0) {
	const emptyMessage = document.createElement('p')
	emptyMessage.textContent = 'No stories found.'
	storyList.append(emptyMessage)
}

/**
 * Resolves a story by its ID
 * @param storyId
 * @returns object containing the component and the file path
 */
async function resolve(storyId: string) {
	const file = Object.keys(stories).find((f) => id(f) === storyId || id(f).endsWith('/' + storyId))
	const mod = file ? await stories[file]() : undefined
	return { component: mod?.default, file }
}

window.mount = async ({ story, props }: StoryMountParams) => {
	const request = ++mountRequest
	// Same story: update reactive props in place so component state is preserved.
	if (current?.story === story) {
		state.props = props ?? {}
		setSelectedStory(id(current.storyFile))
		return
	}
	const resolved = await resolve(story)
	if (!resolved?.component || !resolved.file) throw new Error(`Unknown story: ${story}`)
	if (request !== mountRequest) return
	if (current) await unmount(current.instance)
	state.props = props ?? {}
	const target = document.getElementById('root')!
	target.innerHTML = ''
	const instance = mount(resolved.component, {
		target,
		props: new Proxy(
			{},
			{
				get: (_, key) => (typeof key === 'string' ? state.props[key] : undefined),
				has: (_, key) => key in state.props,
				ownKeys: () => Reflect.ownKeys(state.props),
				getOwnPropertyDescriptor: (_, key) =>
					typeof key === 'string' && key in state.props
						? { enumerable: true, configurable: true, value: state.props[key] }
						: undefined
			}
		)
	})
	current = { story, storyFile: resolved.file, instance }
	setSelectedStory(id(resolved.file))
	galleryError.hidden = true
}
window.unmount = async () => {
	if (current) await unmount(current.instance)
	current = undefined
}

if (storyIds[0]) {
	void window.mount({ story: storyIds[0] }).catch(showError)
}
