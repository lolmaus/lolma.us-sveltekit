import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { crawlMarkdownEntries } from './lib/utils/crawl-markdown-entries.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-static should auto-configure for Vercel when no options are passed here
		adapter: adapter(),

		prerender: {
			crawl: false,
			entries: crawlMarkdownEntries(),
		},
	},
};

export default config;
