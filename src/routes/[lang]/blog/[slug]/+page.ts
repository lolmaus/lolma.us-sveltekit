import { error, type LoadEvent } from '@sveltejs/kit';
import path from 'node:path';
import fs from 'node:fs';
import { building } from '$app/environment';
import type { PageParentData, RouteParams } from './$types';

export const load = building
	? async ({ params }: LoadEvent<RouteParams, null, PageParentData, "/[lang]/blog/[slug]">) => {
			const { lang, slug } = params;

			const parsed = slug.match(/^(.+)-(\d\d\d\d-\d\d-\d\d)$/);

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
				return JSON.parse(jsonStr);
			} catch (error) {
				console.log(error);
				throw error;
			}
		}
	: async ({ fetch, params }: LoadEvent<RouteParams, null, PageParentData, "/[lang]/blog/[slug]">) => {
			const { lang, slug } = params;

			const parsed = slug.match(/^(.+)-(\d\d\d\d-\d\d-\d\d)$/);

			if (!parsed) {
				error(404, 'Not Found');
			}

			const [, name, date] = parsed;
			const fullName = `/content/blog-post/${date}-${lang}-${name}.json`;

			const response = await fetch(fullName);
			const json = await response.json();

			console.log('Client!', json);

			return json;
		};
