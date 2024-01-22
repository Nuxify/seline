export const prerender = true;
import type { PageLoad } from './$types';
import selectedPostId from '../../stores/comments';

export let load: PageLoad = async ({ fetch }) => {
	let postId;

	selectedPostId.subscribe((id) => {
		return (postId = id);
	});

	const commentsResponse = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${postId}/comments`
	);
	const comments = await commentsResponse.json();

	const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
	const post = await postResponse.json();

	return {
		comments,
		post
	};
};
