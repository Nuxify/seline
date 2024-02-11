import type { PageLoad } from './$types'
import { socialAPIStore } from '$lib/infrastructures/service/store/social.store'

export const load: PageLoad = async () => {
	try {
		// get all posts
		socialAPIStore.GetPosts()
	} catch (error) {
		console.error(error)
	}
}
