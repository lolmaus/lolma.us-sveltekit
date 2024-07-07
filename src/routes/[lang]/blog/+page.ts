import path from 'node:path';
import fs from 'node:fs';
import { building } from '$app/environment';
import { BlogPostsIndexSchema } from '$lib/entities.js';

export const load = async ({ fetch, params }) => {
	const { lang } = params;
	let blogPostsRaw: unknown; // ToDo: uze zod to type this

	if (building) {
		// Server-side datga loading via fs.readdir

		const cwd = process.cwd();
		const fullName = path.join(cwd, 'static', 'content', 'blog-post', `index-${lang}.json`);

		try {
			const jsonStr = await fs.promises.readFile(fullName, 'utf8');
			console.log('Server!', jsonStr);
      blogPostsRaw = JSON.parse(jsonStr);
		} catch (error) {
			console.log(error);
			throw error;
		}
	} else {
		// Client-side data loading via HTTP fetch

		const { lang } = params;

		const fullName = `/content/blog-post/index-${lang}.json`;

		const response = await fetch(fullName);
		blogPostsRaw = await response.json();

		console.log('Client!', blogPostsRaw);
	}

	const blogPosts = BlogPostsIndexSchema.parse(blogPostsRaw);

	return { blogPosts, lang };
};
