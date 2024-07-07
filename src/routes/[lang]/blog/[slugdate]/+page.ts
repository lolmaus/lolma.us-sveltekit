import { error } from '@sveltejs/kit';
import path from 'node:path';
import fs from 'node:fs';
import { building } from '$app/environment';
import { BlogPostSchema } from '$lib/entities.js';

export const load = async ({ fetch, params }) => {
	const { lang, slugdate } = params;
	let blogPostRaw: unknown; // TODO: use zod to type this

	if (building) {
		// Server-side datga loading via fs.readdir

		const parsed = slugdate.match(/^(.+)-(\d\d\d\d-\d\d-\d\d)$/);

		if (!parsed) {
			error(404, 'Not Found');
		}

		const [, name, date] = parsed;
		const cwd = process.cwd();
		const fullName = path.join(
			cwd,
			'static',
			'content',
			'blog-post',
			`${date}-${lang}-${name}.json`
		);

		try {
			const jsonStr = await fs.promises.readFile(fullName, 'utf8');
			console.log('Server!', jsonStr);
			blogPostRaw =  JSON.parse(jsonStr);
		} catch (error) {
			console.log(error);
			throw error;
		}
	} else {
		// Client-side data loading via HTTP fetch

		const { lang, slugdate } = params;

		const parsed = slugdate.match(/^(.+)-(\d\d\d\d-\d\d-\d\d)$/);

		if (!parsed) {
			error(404, 'Not Found');
		}

		const [, slug, date] = parsed;
		const fullName = `/content/blog-post/${date}-${lang}-${slug}.json`;

		const response = await fetch(fullName);
		blogPostRaw = await response.json();

		console.log('Client!', blogPostRaw);
	}

	const blogPost = BlogPostSchema.parse(blogPostRaw);

	return {
		lang,
		blogPost
	};
};
