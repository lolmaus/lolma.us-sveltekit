import { building } from '$app/environment';
import { EntitiesSchema } from '$lib/entities.js';

export const load = async ({ params, fetch }) => {
	const { lang } = params;
	let indexItemsRaw: unknown; // ToDo: uze zod to type this

	if (building) {
		// Server-side datga loading via fs.readdir
		const { join } = await import('node:path');
		const { promises } = await import('node:fs');

		const cwd = process.cwd();
		const fullName = join(cwd, 'static', 'content', 'index-item', `index-${lang}.json`);

		try {
			const jsonStr = await promises.readFile(fullName, 'utf8');
      indexItemsRaw = JSON.parse(jsonStr);
		} catch (error) {
			const { default: EsExtensionsNode } = await import('@yamato-daiwa/es-extensions-nodejs');

			if (EsExtensionsNode.isErrnoException(error)) {
				indexItemsRaw = [];
			} else {
				throw error;
			}
		}
	} else {
		// Client-side data loading via HTTP fetch

		const { lang } = params;
		const fullName = `/content/index-item/index-${lang}.json`;
		const response = await fetch(fullName);

		if (response.ok) {
			indexItemsRaw = await response.json();
		} else if (response.status === 404) {
			indexItemsRaw = [];
		} else {
			throw new Error(response.statusText);
		}
	}

	const indexItems = EntitiesSchema.parse(indexItemsRaw);

	return { indexItems, lang };
}