import { socialAPI } from '#lib/core/application/service/store/social.api.store.js'
import { homeStore } from '#lib/core/module/home/application/service/store/home.store.js'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	homeStore.subscribe((state) => {
		socialAPI.getPostCommentsStore.call(state.selectedPost.id)
	})
}
