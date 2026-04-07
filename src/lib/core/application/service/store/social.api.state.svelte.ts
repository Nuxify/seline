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

const createPostInitial: StateDTO<CreatePostResponse> = {
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

const getPostCommentsInitial: StateDTO<CommentResponse[]> = {
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

const getPostsInitial: StateDTO<PostResponse[]> = {
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

export const createPostState = $state<StateDTO<CreatePostResponse>>(createPostInitial)
export const getPostsState = $state<StateDTO<PostResponse[]>>(getPostsInitial)
export const getPostCommentsState = $state<StateDTO<CommentResponse[]>>(getPostCommentsInitial)

export const createPostStore = createAPIHandler<
	CreatePostRequest,
	ModelCreatePostResponse,
	CreatePostResponse
>(createPostState, SocialRepository.CreatePost.bind(SocialRepository))

export const getPostsStore = createAPIHandler<void, ModelPostResponse[], PostResponse[]>(
	getPostsState,
	SocialRepository.GetPosts.bind(SocialRepository)
)

export const getPostCommentsStore = createAPIHandler<
	number,
	ModelCommentResponse[],
	CommentResponse[]
>(getPostCommentsState, SocialRepository.GetPostComments.bind(SocialRepository))

export const socialAPI = {
	createPostStore,
	getPostsStore,
	getPostCommentsStore
}
