import svelteFluent from '@nubolab-ffwd/svelte-fluent/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import parseMarkdown from './lib/parse-markdown';

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
	plugins: [svelteFluent(), sveltekit(), parseMarkdown(markdownOptions)],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
