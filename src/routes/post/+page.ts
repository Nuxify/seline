import { socialAPI } from '$lib/core/application/service/store/social.api.store'
import { homeStore } from '$lib/core/module/home/application/service/store/home.store'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	homeStore.subscribe((state) => {
		socialAPI.getCommentsStore.GetCommentsByPost(state.selectedPost.id)
	})
}
