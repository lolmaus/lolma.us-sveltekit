import { building } from '$app/environment';
import { BlogPostsIndexSchema } from '$lib/entities.js';

export const load = async ({ fetch, params }) => {
	const { lang } = params;
	let blogPostsRaw: unknown; // ToDo: uze zod to type this

	if (building) {
		// Server-side datga loading via fs.readdir
		const { join } = await import('node:path');
		const { promises } = await import('node:fs');

		const cwd = process.cwd();
		const fullName = join(cwd, 'static', 'content', 'blog-post', `index-${lang}.json`);

		try {
			const jsonStr = await promises.readFile(fullName, 'utf8');
			blogPostsRaw = JSON.parse(jsonStr);
		} catch (error) {
			const { default: EsExtensionsNode } = await import('@yamato-daiwa/es-extensions-nodejs');

			if (EsExtensionsNode.isErrnoException(error)) {
				blogPostsRaw = [];
			} else {
				throw error;
			}
		}
	} else {
		// Client-side data loading via HTTP fetch

		const { lang } = params;
		const fullName = `/content/blog-post/index-${lang}.json`;
		const response = await fetch(fullName);

		if (response.ok) {
			blogPostsRaw = await response.json();
		} else if (response.status === 404) {
			blogPostsRaw = [];
		} else {
			throw new Error(response.statusText);
		}
	}

	const blogPosts = BlogPostsIndexSchema.parse(blogPostsRaw);

	return { blogPosts, lang };
};
