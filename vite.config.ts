import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import parseMarkdown from './lib/utils/parse-markdown';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

const markdownOptions = {
	entities: {
		'blog-post': {
			individual: true,
			index: true,
			htmlInIndex: false,
		}
	}
}

export default defineConfig({
	plugins: [sveltekit(), parseMarkdown(markdownOptions), purgeCss()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
