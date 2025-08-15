/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./index.tsx',
		'./App.tsx',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./hooks/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif']
			},
			colors: {
				'brand-primary': '#ef4444',
				'brand-secondary': '#dc2626',
				'brand-dark': '#1f2937',
				'brand-light': '#f9fafb',
				'brand-accent': '#fef2f2'
			}
		}
	},
	plugins: []
};
