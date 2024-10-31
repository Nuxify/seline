import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import type { ISocialRepository } from '$lib/core/domain/repository/social.repository'
import type { APIResponse, ErrorAPIResponse } from '$lib/core/domain/models/dto'
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

	/**
	 * Create a post
	 *
	 * @param   {CreatePostRequest<APIResponse><CreatePostResponse>}  request
	 *
	 * @return  {Promise<APIResponse><CreatePostResponse>}
	 */
	public async CreatePost(request: CreatePostRequest): Promise<APIResponse<CreatePostResponse>> {
		return this.$axios
			.post('/v1/seline/post/add', request)
			.then((response: AxiosResponse<APIResponse<CreatePostResponse>>) => {
				const { data } = response
				return data
			})
			.catch((error: AxiosError<ErrorAPIResponse>) => {
				const { response } = error
				throw response?.data !== undefined ? response.data : {}
			})
	}

	/**
	 * Get posts
	 *
	 * @return  {Promise<APIResponse><PostResponse>[]}
	 */
	public async GetAllPosts(): Promise<APIResponse<PostResponse[]>> {
		return this.$axios
			.get('/v1/seline/post/list')
			.then((response: AxiosResponse<APIResponse<PostResponse[]>>) => {
				const { data } = response
				return data
			})
			.catch((error: AxiosError<ErrorAPIResponse>) => {
				const { response } = error
				throw response?.data !== undefined ? response.data : {}
			})
	}

	/**
	 * Get comments by post id
	 *
	 * @param   {number<APIResponse><CommentResponse>[]}   postId
	 *
	 * @return  {Promise<APIResponse><CommentResponse>[]}
	 */
	public async GetPostComments(postId: number): Promise<APIResponse<CommentResponse[]>> {
		return this.$axios
			.get(`/v1/seline/post/comment`, {
				params: {
					postId
				}
			})
			.then((response: AxiosResponse<APIResponse<CommentResponse[]>>) => {
				const { data } = response
				return data
			})
			.catch((error: AxiosError<ErrorAPIResponse>) => {
				const { response } = error
				throw response?.data !== undefined ? response.data : {}
			})
	}
}
