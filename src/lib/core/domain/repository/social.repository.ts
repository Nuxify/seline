import type { APIResponse } from '../models/dto'
import type {
	CreatePostRequest,
	CreatePostResponse,
	CommentResponse,
	PostResponse
} from '$lib/core/domain/models/social.dto'

export interface ISocialRepository {
	CreatePost(request: CreatePostRequest): Promise<APIResponse<CreatePostResponse>>
	GetAllPosts(): Promise<APIResponse<PostResponse[]>>
	GetPostComments(postId: number): Promise<APIResponse<CommentResponse[]>>
}
