import { writable } from 'svelte/store'
import { SocialRepository } from '$lib/servicecontainer'
import type { ErrorAPIResponse } from '$lib/core/domain/models/dto'
import type {
	StateDTO,
	CreatePostRequest,
	CreatePostResponse,
	CommentResponse,
	PostResponse
} from './social.api.dto'

const createPostState: StateDTO<CreatePostResponse> = {
	state: {
		LOADING: false,
		SUCCESS: false,
		FAILED: false
	},
	response: {
		message: '',
		errorCode: null,
		data: {} as CreatePostResponse
	}
}
const getCommentsState: StateDTO<CommentResponse[]> = {
	state: {
		LOADING: false,
		SUCCESS: false,
		FAILED: false
	},
	response: {
		message: '',
		errorCode: null,
		data: [] as CommentResponse[]
	}
}
const getPostsState: StateDTO<PostResponse[]> = {
	state: {
		LOADING: false,
		SUCCESS: false,
		FAILED: false
	},
	response: {
		message: '',
		errorCode: null,
		data: [] as PostResponse[]
	}
}

const createPostWritable = writable(createPostState)
const getPostsWritable = writable(getPostsState)
const getCommentsWritable = writable(getCommentsState)

export const createPostStore = {
	...createPostWritable,
	async CreatePost(request: CreatePostRequest): Promise<void> {
		// loading
		createPostWritable.update((store) => {
			store.state.LOADING = true
			store.state.SUCCESS = false
			store.state.FAILED = false
			return store
		})

		try {
			const response = await SocialRepository.CreatePost({
				title: request.title,
				body: request.body
			})

			// success
			createPostWritable.update((store) => {
				store.state.LOADING = false
				store.state.SUCCESS = true
				store.state.FAILED = false
				store.response = {
					message: 'Successfully created post.', // FIXME: this should be assigned from API response
					errorCode: null,
					data: {
						id: response.id,
						title: response.title,
						body: response.body
					}
				}
				return store
			})
		} catch (error) {
			const err = error as ErrorAPIResponse

			// failed
			createPostWritable.update((store) => {
				store.state.LOADING = false
				store.state.SUCCESS = false
				store.state.FAILED = true
				store.response = {
					message: 'Error occurred while creating post.', // FIXME: this should be assigned from API response
					errorCode: err.errorCode ?? null, // FIXME: this should be assigned from API response
					data: {} as CreatePostResponse
				}
				return store
			})
		} finally {
			// reset
			createPostWritable.update((store) => {
				store.state.LOADING = false
				store.state.SUCCESS = false
				store.state.FAILED = false
				return store
			})
		}
	}
}

export const getCommentsStore = {
	...getCommentsWritable,
	async GetCommentsByPost(postId: number): Promise<void> {
		// loading
		getCommentsWritable.update((store) => {
			store.state.LOADING = true
			store.state.SUCCESS = false
			store.state.FAILED = false
			return store
		})

		try {
			const response = await SocialRepository.GetCommentsByPostId(postId)
			const comments = response.map((item) => {
				const comment: CommentResponse = {
					id: item.id,
					postId: item.postId,
					name: item.name,
					email: item.email,
					body: item.body
				}

				return comment
			})

			// success
			getCommentsWritable.update((store) => {
				store.state.LOADING = false
				store.state.SUCCESS = true
				store.state.FAILED = false
				store.response = {
					message: 'Successfully fetched comments.', // FIXME: this should be assigned from API response
					errorCode: null,
					data: comments
				}
				return store
			})
		} catch (error) {
			const err = error as ErrorAPIResponse

			// failed
			getCommentsWritable.update((store) => {
				store.state.LOADING = false
				store.state.SUCCESS = false
				store.state.FAILED = true
				store.response = {
					message: 'Error occurred while fetching comments.', // FIXME: this should be assigned from API response
					errorCode: err.errorCode ?? null, // FIXME: this should be assigned from API response
					data: []
				}
				return store
			})
		} finally {
			// reset
			getCommentsWritable.update((store) => {
				store.state.LOADING = false
				store.state.SUCCESS = false
				store.state.FAILED = false
				return store
			})
		}
	}
}

export const getPostsStore = {
	...getPostsWritable,
	async GetPosts(): Promise<void> {
		// loading
		getPostsWritable.update((store) => {
			store.state.LOADING = true
			store.state.SUCCESS = false
			store.state.FAILED = false
			return store
		})

		try {
			const response = await SocialRepository.GetPosts()
			const posts = response.map((item) => {
				const post: PostResponse = {
					id: item.id,
					userId: item.userId,
					title: item.title,
					body: item.body
				}

				return post
			})

			// success
			getPostsWritable.update((store) => {
				store.state.LOADING = false
				store.state.SUCCESS = true
				store.state.FAILED = false
				store.response = {
					message: 'Successfully fetched posts.', // FIXME: this should be assigned from API response
					errorCode: null,
					data: posts
				}
				return store
			})
		} catch (error) {
			const err = error as ErrorAPIResponse

			// failed
			getPostsWritable.update((store) => {
				store.state.LOADING = false
				store.state.SUCCESS = false
				store.state.FAILED = true
				store.response = {
					message: 'Error occurred while fetching posts.', // FIXME: this should be assigned from API response
					errorCode: err.errorCode ?? null, // FIXME: this should be assigned from API response
					data: []
				}
				return store
			})
		} finally {
			// reset
			getPostsWritable.update((store) => {
				store.state.LOADING = false
				store.state.SUCCESS = false
				store.state.FAILED = false
				return store
			})
		}
	}
}

export const socialAPI = {
	createPostStore,
	getCommentsStore,
	getPostsStore
}
