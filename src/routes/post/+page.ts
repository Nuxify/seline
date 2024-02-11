import type { PageLoad } from './$types'
import { socialAPIStore } from '$lib/infrastructures/service/store/social.store'
import { homeStore } from '$lib/module/home/service/store/home.store'

export const load: PageLoad = async () => {
	homeStore.subscribe((state) => {
		try {
			// get comments by post
			socialAPIStore.GetCommentsByPost(state.selectedPost.id)
		} catch (error) {
			console.error(error)
		}
	})
}
