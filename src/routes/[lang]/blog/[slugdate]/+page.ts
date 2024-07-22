import { error } from '@sveltejs/kit';
import { building } from '$app/environment';
import { BlogPostSchema } from '$lib/entities.js';

export const load = async ({ fetch, params }) => {
	const { lang, slugdate } = params;
	const slugDateParsed = slugdate.match(/^(.+)-(\d\d\d\d-\d\d-\d\d)$/);

	if (!slugDateParsed) {
		error(404, 'Not Found');
	}

	const [, slug, date] = slugDateParsed;
	let blogPostRaw: unknown;

	if (building) {
		// Server-side datga loading via fs.readdir
		const { join } = await import('node:path');
		const { promises } = await import('node:fs');
		const cwd = process.cwd();

		const fullName = join(cwd, 'static', 'content', 'blog-post', `${date}-${lang}-${slug}.json`);

		const jsonStr = await promises.readFile(fullName, 'utf8');
		blogPostRaw = JSON.parse(jsonStr);
	} else {
		// Client-side data loading via HTTP fetch
		const fullName = `/content/blog-post/${date}-${lang}-${slug}.json`;
		const response = await fetch(fullName);
		blogPostRaw = await response.json();
	}

	const blogPost = BlogPostSchema.parse(blogPostRaw);

	return {
		lang,
		blogPost,
	};
};
