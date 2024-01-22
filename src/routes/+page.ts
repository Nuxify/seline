export const prerender = true;
import type { PageLoad } from "./$types";

export let load: PageLoad  = async ({fetch}) => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const posts = await response.json();
    
	return {
		posts
	};
};
