export const prerender = true;
import type { Load } from '@sveltejs/kit';

export let load: Load = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const posts = await response.json();
    
	return {
		posts
	};
};
