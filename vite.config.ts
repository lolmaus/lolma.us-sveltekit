import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import generateJsonFromMarkdown from './lib/utils/generate-json-from-markdown';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

const markdownOptions = {
	entities: {
		'blog-post': {
			individual: true,
			index: true,
			htmlInIndex: false,
		},
		'home-item': {
			individual: false,
			index: true,
			htmlInIndex: true,
		},
	},
};

export default defineConfig({
	plugins: [sveltekit(), generateJsonFromMarkdown(markdownOptions), purgeCss()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
