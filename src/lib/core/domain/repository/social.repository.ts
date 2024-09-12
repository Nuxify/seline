import type {
	CreatePostRequest,
	CreatePostResponse,
	CommentResponse,
	PostResponse
} from '$lib/core/domain/models/social.dto'

export interface ISocialRepository {
	CreatePost(request: CreatePostRequest): Promise<CreatePostResponse>
	GetPosts(): Promise<PostResponse[]>
	GetCommentsByPostId(postId: number): Promise<CommentResponse[]>
}
