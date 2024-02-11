export interface WritableDTO {
	selectedPost: Post
}

export interface Post {
	id: number
	userId: number
	title: string
	body: string
}
