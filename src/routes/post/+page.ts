import { socialAPI } from '$lib/infrastructures/service/store/social.store'
import { homeStore } from '$lib/module/home/service/store/home.store'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	homeStore.subscribe((state) => {
		socialAPI.getCommentsStore.GetCommentsByPost(state.selectedPost.id)
	})
}
