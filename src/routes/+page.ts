import { socialAPI } from '$lib/core/application/service/store/social.api.state.svelte'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	// get all posts
	socialAPI.getPostsStore.call()
}
