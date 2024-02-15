import { socialAPI } from '$lib/application/service/store/social.api.store'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	// get all posts
	socialAPI.getPostsStore.GetPosts()
}
