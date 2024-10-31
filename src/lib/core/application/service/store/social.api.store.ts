import { writable } from 'svelte/store'
import { ISocialRepository } from '$lib/servicecontainer'
import type {
	CreatePostResponse as ModelCreatePostResponse,
	CommentResponse as ModelCommentResponse,
	PostResponse as ModelPostResponse
} from '$lib/core/domain/models/social.dto'
import type {
	StateDTO,
	CreatePostRequest,
	CreatePostResponse,
	CommentResponse,
	PostResponse
} from './social.api.dto'
import { createAPIHandler } from '$lib/internal/api.store'

const createPostWritable = writable<StateDTO<CreatePostResponse>>({
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
})
const getCommentsWritable = writable<StateDTO<CommentResponse[]>>({
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
})
const getAllPostsWritable = writable<StateDTO<PostResponse[]>>({
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
})

export const createPostStore = createAPIHandler<
	CreatePostRequest,
	ModelCreatePostResponse,
	CreatePostResponse
>(createPostWritable, ISocialRepository.CreatePost.bind(ISocialRepository))

export const getAllPostsStore = createAPIHandler<void, ModelPostResponse[], PostResponse[]>(
	getAllPostsWritable,
	ISocialRepository.GetAllPosts.bind(ISocialRepository)
)

export const getPostCommentsStore = createAPIHandler<
	number,
	ModelCommentResponse[],
	CommentResponse[]
>(getCommentsWritable, ISocialRepository.GetPostComments.bind(ISocialRepository))

export const socialAPI = {
	createPostStore,
	getAllPostsStore,
	getPostCommentsStore
}
