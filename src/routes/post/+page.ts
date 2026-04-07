import { socialAPI } from '$lib/core/application/service/store/social.api.state.svelte'
import { homeState } from '$lib/core/module/home/application/service/store/home.state.svelte'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	socialAPI.getPostCommentsStore.call(homeState.selectedPost.id)
}
