/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin')],

	theme: {
		container: {
			center: true
		},
		extend: {
			colors: {
				primary: '#EE1F70',
				accent: '#979797',
				secondary: '#D89B4B'
			}
		}
	}
};

module.exports = config;
