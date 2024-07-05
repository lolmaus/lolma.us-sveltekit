import { error } from '@sveltejs/kit';
import path from 'node:path';
import fs from 'node:fs';
import { building } from '$app/environment';

export const load = async ({ fetch, params }) => {
	const { lang } = params;
	let blogPosts: any; // ToDo: uze zod to type this

	if (building) {
		// Server-side datga loading via fs.readdir

		const cwd = process.cwd();
		const fullName = path.join(cwd, 'static', 'content', 'blog-post', `index-${lang}.json`);

		try {
			const jsonStr = await fs.promises.readFile(fullName, 'utf8');
			console.log('Server!', jsonStr);
      blogPosts = JSON.parse(jsonStr);
		} catch (error) {
			console.log(error);
			throw error;
		}
	} else {
		// Client-side data loading via HTTP fetch

		const { lang } = params;

		const fullName = `/content/blog-post/index-${lang}.json`;

		const response = await fetch(fullName);
		blogPosts = await response.json();

		console.log('Client!', blogPosts);
	}

	return { blogPosts, lang };
};
