/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'red-principal': '#E86060',
				'red-secondary': '#EB5757',
				'light-red': '#FF7676',
				'dark-red': '#662323',
				'gray-1': '#828282',
				'gray-2': '#4F4F4F',
				'gray-3': '#555555',
				'soft-gray': '#BDBDBD',
			},
		},
	},
	plugins: [],
}
