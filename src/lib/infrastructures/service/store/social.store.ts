import axios from 'axios'
import { writable } from 'svelte/store'
import { SocialRepository } from '$lib/infrastructures/repository/social.repository'
import { AxiosConfig } from '$lib/configs/axios'
import type {
	WritableDTO,
	CreatePostRequest,
	CommentResponse,
	PostResponse,
	CreatePostResponse
} from './social.dto'
import type { ErrorAPIResponse } from '$lib/infrastructures/models/dto'

/// dependency injection
const $axios = axios.create(AxiosConfig)
const ISocialRepository = new SocialRepository($axios)

const state: WritableDTO = {
	/// state
	CreatePostState: {
		LOADING: false,
		SUCCESS: false,
		FAILED: false
	},
	GetCommentsState: {
		LOADING: false,
		SUCCESS: false,
		FAILED: false
	},
	GetPostsState: {
		LOADING: false,
		SUCCESS: false,
		FAILED: false
	},
	/// data
	CreatePostResponse: {
		message: '',
		errorCode: null,
		data: {} as CreatePostResponse
	},
	CommentsResponse: {
		message: '',
		errorCode: null,
		data: [] as CommentResponse[]
	},
	PostsResponse: {
		message: '',
		errorCode: null,
		data: [] as PostResponse[]
	}
}
const { subscribe, update } = writable(state)

export const socialAPIStore = {
	subscribe,
	async CreatePost(request: CreatePostRequest): Promise<void> {
		// loading
		update((store) => {
			store.CreatePostState.LOADING = true
			store.CreatePostState.SUCCESS = false
			store.CreatePostState.FAILED = false
			return store
		})

		try {
			const response = await ISocialRepository.CreatePost({
				title: request.title,
				body: request.body
			})

			// success
			update((store) => {
				store.CreatePostState.LOADING = false
				store.CreatePostState.SUCCESS = true
				store.CreatePostState.FAILED = false
				store.CreatePostResponse = {
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
			update((store) => {
				store.CreatePostState.LOADING = false
				store.CreatePostState.SUCCESS = false
				store.CreatePostState.FAILED = true
				store.CreatePostResponse = {
					message: err.message, // FIXME: this should be assigned from API response
					errorCode: err.errorCode ?? null, // FIXME: this should be assigned from API response
					data: {} as CreatePostResponse
				}
				return store
			})
		} finally {
			// reset
			update((store) => {
				store.CreatePostState.LOADING = false
				store.CreatePostState.SUCCESS = false
				store.CreatePostState.FAILED = false
				return store
			})
		}
	},
	async GetCommentsByPost(postId: number): Promise<void> {
		// loading
		update((store) => {
			store.GetCommentsState.LOADING = true
			store.GetCommentsState.SUCCESS = false
			store.GetCommentsState.FAILED = false
			return store
		})

		try {
			const response = await ISocialRepository.GetCommentsByPostId(postId)
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
			update((store) => {
				store.GetCommentsState.LOADING = false
				store.GetCommentsState.SUCCESS = true
				store.GetCommentsState.FAILED = false
				store.CommentsResponse = {
					message: 'Successfully fetched comments.', // FIXME: this should be assigned from API response
					errorCode: null,
					data: comments
				}
				return store
			})
		} catch (error) {
			const err = error as ErrorAPIResponse

			// failed
			update((store) => {
				store.GetCommentsState.LOADING = false
				store.GetCommentsState.SUCCESS = false
				store.GetCommentsState.FAILED = true
				store.CommentsResponse = {
					message: err.message, // FIXME: this should be assigned from API response
					errorCode: err.errorCode ?? null, // FIXME: this should be assigned from API response
					data: []
				}
				return store
			})
		} finally {
			// reset
			update((store) => {
				store.GetCommentsState.LOADING = false
				store.GetCommentsState.SUCCESS = false
				store.GetCommentsState.FAILED = false
				return store
			})
		}
	},
	async GetPosts(): Promise<void> {
		// loading
		update((store) => {
			store.GetPostsState.LOADING = true
			store.GetPostsState.SUCCESS = false
			store.GetPostsState.FAILED = false
			return store
		})

		try {
			const response = await ISocialRepository.GetPosts()
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
			update((store) => {
				store.GetPostsState.LOADING = false
				store.GetPostsState.SUCCESS = true
				store.GetPostsState.FAILED = false
				store.PostsResponse = {
					message: 'Successfully fetched posts.', // FIXME: this should be assigned from API response
					errorCode: null,
					data: posts
				}
				return store
			})
		} catch (error) {
			const err = error as ErrorAPIResponse

			// failed
			update((store) => {
				store.GetPostsState.LOADING = false
				store.GetPostsState.SUCCESS = false
				store.GetPostsState.FAILED = true
				store.PostsResponse = {
					message: err.message, // FIXME: this should be assigned from API response
					errorCode: err.errorCode ?? null, // FIXME: this should be assigned from API response
					data: []
				}
				return store
			})
		} finally {
			// reset
			update((store) => {
				store.GetPostsState.LOADING = false
				store.GetPostsState.SUCCESS = false
				store.GetPostsState.FAILED = false
				return store
			})
		}
	}
}
