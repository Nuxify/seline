import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import type { ISocialRepository } from '$lib/core/domain/repository/social.repository'
import type {
	CreatePostRequest,
	CreatePostResponse,
	CommentResponse,
	PostResponse
} from '$lib/core/domain/models/social.dto'

export class SocialRepository implements ISocialRepository {
	private readonly $axios: AxiosInstance

	constructor(axios: AxiosInstance) {
		this.$axios = axios
	}

	// TODO: implementation example for responses with metadata structure
	// public async GetPosts(): Promise<APIResponse<PostResponse[]>> {
	// 	return this.$axios
	// 		.get('/posts')
	// 		.then((response: AxiosResponse<APIResponse<PostResponse[]>>) => {
	// 			const { data } = response
	// 			return data
	// 		})
	// 		.catch((error: AxiosError<ErrorAPIResponse>) => {
	// 			const { response } = error
	// 			throw response?.data !== undefined ? response.data : {}
	// 		})
	// }

	/**
	 * Create a post
	 *
	 * @param   {CreatePostRequest<CreatePostResponse>}  request
	 *
	 * @return  {Promise<CreatePostResponse>}
	 */
	public async CreatePost(request: CreatePostRequest): Promise<CreatePostResponse> {
		return this.$axios
			.post('/posts', request)
			.then((response: AxiosResponse<CreatePostResponse>) => {
				const { data } = response
				return data
			})
			.catch((error: AxiosError) => {
				throw error
			})
	}

	/**
	 * Get posts
	 *
	 * @return  {Promise<PostResponse[]>}
	 */
	public async GetPosts(): Promise<PostResponse[]> {
		return this.$axios
			.get('/posts')
			.then((response: AxiosResponse<PostResponse[]>) => {
				const { data } = response
				return data
			})
			.catch((error: AxiosError) => {
				throw error
			})
	}

	/**
	 * Get comments by post id
	 *
	 * @param   {number}  postId
	 *
	 * @return  {Promise<CommentResponse[]>}
	 */
	public async GetCommentsByPostId(postId: number): Promise<CommentResponse[]> {
		return this.$axios
			.get(`/posts/${postId}/comments`)
			.then((response: AxiosResponse<CommentResponse[]>) => {
				const { data } = response
				return data
			})
			.catch((error: AxiosError) => {
				throw error
			})
	}
}
