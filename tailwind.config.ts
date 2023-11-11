/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./components/**/*.{ts,tsx,vue}', './src/**/*.{ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {},
	},
};

export default config;
