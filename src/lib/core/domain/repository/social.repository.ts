import type { APIResponse } from '$lib/core/domain/models/dto'
import type {
	CreatePostRequest,
	CreatePostResponse,
	CommentResponse,
	PostResponse
} from '$lib/core/domain/models/social.dto'

export interface ISocialRepository {
	/**
	 * Create a post
	 *
	 * @param   {CreatePostRequest<APIResponse><CreatePostResponse>}  request
	 *
	 * @return  {Promise<APIResponse><CreatePostResponse>}
	 */
	CreatePost(request: CreatePostRequest): Promise<APIResponse<CreatePostResponse>>

	/**
	 * Get posts
	 *
	 * @return  {Promise<APIResponse><PostResponse>[]}
	 */
	GetPosts(): Promise<APIResponse<PostResponse[]>>

	/**
	 * Get post comments
	 *
	 * @param   {number<APIResponse><CommentResponse>[]}   postId
	 *
	 * @return  {Promise<APIResponse><CommentResponse>[]}
	 */
	GetPostComments(postId: number): Promise<APIResponse<CommentResponse[]>>
}
