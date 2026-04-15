import { writable } from 'svelte/store'
import { SocialRepository } from '$lib/servicecontainer'
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
const getPostsWritable = writable<StateDTO<PostResponse[]>>({
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
>(createPostWritable, SocialRepository.CreatePost.bind(SocialRepository))

export const getPostsStore = createAPIHandler<void, ModelPostResponse[], PostResponse[]>(
	getPostsWritable,
	SocialRepository.GetPosts.bind(SocialRepository)
)

export const getPostCommentsStore = createAPIHandler<
	number,
	ModelCommentResponse[],
	CommentResponse[]
>(getCommentsWritable, SocialRepository.GetPostComments.bind(SocialRepository))

export const socialAPI = {
	createPostStore,
	getPostsStore,
	getPostCommentsStore
}
