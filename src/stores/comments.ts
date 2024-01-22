import { writable } from 'svelte/store';

const selectedPostId = writable(0);

export default selectedPostId