export interface CreatePostRequest {
	title: string
	body: string
}

export interface CreatePostResponse {
	readonly id: number
	readonly title: string
	readonly body: string
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
