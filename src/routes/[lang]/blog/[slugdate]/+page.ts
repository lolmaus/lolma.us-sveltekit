import { error } from '@sveltejs/kit';
import { readOrFetchBlogPost } from '$lib/data.js';
import promiseHash from 'promise.hash.helper';

export const load = async ({ fetch, params }) => {
	const { lang, slugdate } = params;
	const slugDateParsed = slugdate.match(/^(.+)-(\d\d\d\d-\d\d-\d\d)$/);

	if (!slugDateParsed) {
		error(404, 'Not Found');
	}

	const [, slug, date] = slugDateParsed;

	return promiseHash({
		blogPost: readOrFetchBlogPost({ date, lang, slug }, fetch),
	});
};
