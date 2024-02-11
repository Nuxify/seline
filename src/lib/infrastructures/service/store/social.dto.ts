export interface WritableDTO {
	/// state
	CreatePostState: {
		LOADING: boolean
		SUCCESS: boolean
		FAILED: boolean
	}
	GetCommentsState: {
		LOADING: boolean
		SUCCESS: boolean
		FAILED: boolean
	}
	GetPostsState: {
		LOADING: boolean
		SUCCESS: boolean
		FAILED: boolean
	}
	/// data
	CreatePostResponse: {
		message: string
		errorCode: string | null
		data: CreatePostResponse
	}
	CommentsResponse: {
		message: string
		errorCode: string | null
		data: CommentResponse[]
	}
	PostsResponse: {
		message: string
		errorCode: string | null
		data: PostResponse[]
	}
}

export interface CreatePostRequest {
	title: string
	body: string
}

export interface CreatePostResponse {
	id: number
	title: string
	body: string
}

export interface CommentResponse {
	readonly id: number
	readonly postId: number
	readonly name: string
	readonly email: string
	readonly body: string
}

export interface PostResponse {
	readonly id: number
	readonly userId: number
	readonly title: string
	readonly body: string
}
