/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				// titles: ['"Raleway"', 'sans-serif'],
				// body: ['"DM Serif Display"', 'serif'],
				// script: ['"Sugeng-Rawuh"', 'sans-serif'],
			},
			colors: {
				madeonaBrown: {
					100: '#f5eee6',
					200: '#e0ccc0',
					300: '#cab5a2',
					400: '#9a7365',
					500: '#b9907a',
					600: '#5d4239',
					700: '#9b684d',
				},
			},
			screens: {
				'3xl': '1700px',
			},
		},
		plugins: [],
	},
};
