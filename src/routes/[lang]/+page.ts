import { readOrFetchHomeItemIndex } from '$lib/data.js';
import promiseHash from 'promise.hash.helper';

export const load = async ({ params, fetch }) => {
	const { lang } = params;

	return promiseHash({
		homeItems: readOrFetchHomeItemIndex(lang, fetch),
	});
};
