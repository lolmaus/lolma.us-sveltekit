import { readOrFetchBlogPostIndex } from '$lib/data.js';
import { initFluent } from '$lib/intl.js';
import promiseHash from 'promise.hash.helper';

export const load = async ({ params, fetch }) => {
	const { lang } = params;

	return promiseHash({
		blogPosts: readOrFetchBlogPostIndex(lang, fetch),
		fluent: initFluent(lang),
		lang,
	});
};
