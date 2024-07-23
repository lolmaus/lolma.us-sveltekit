import { building } from '$app/environment';
import type { z, ZodType } from 'zod';
import {
	BlogPostSchema,
	BlogPostsIndexSchema,
	EntitiesSchema,
	type BlogPost,
	type BlogPostInIndex,
	type Entity,
} from './entities';

/**
 * Server-side data loading via fs.readdir
 **/
export const readItem = async (entityTypeName: string, entityItemName: string) => {
	const { join } = await import('node:path');
	const { promises } = await import('node:fs');
	const cwd = process.cwd();
	const fullName = join(cwd, 'static', 'content', entityTypeName, `${entityItemName}.json`);

	try {
		const jsonStr = await promises.readFile(fullName, 'utf8');
		return JSON.parse(jsonStr);
	} catch (error) {
		const { default: EsExtensionsNode } = await import('@yamato-daiwa/es-extensions-nodejs');

		if (EsExtensionsNode.isErrnoException(error)) {
			return [];
		} else {
			throw error;
		}
	}
};

/**
 * Client-side data loading via HTTP fetch
 **/
export const fetchItem = async (
	entityName: string,
	entityItemName: string,
	fetchSvelte: typeof fetch
) => {
	const fullName = `/content/${entityName}/${entityItemName}.json`;
	const response = await fetchSvelte(fullName);

	if (response.ok) {
		return await response.json();
	} else if (response.status === 404) {
		return [];
	} else {
		throw new Error(response.statusText);
	}
};

export const readOrFetchItem = async <Z extends ZodType>(
	entityTypeName: string,
	entityItemName: string,
	fetchSvelte: typeof fetch,
	schema: Z
): Promise<z.infer<Z>> => {
	const result: unknown = building
		? await readItem(entityTypeName, entityItemName)
		: await fetchItem(entityTypeName, entityItemName, fetchSvelte);

	return schema.parse(result);
};

export const readOrFetchHomeItemIndex = async (
	lang: string,
	fetchSvelte: typeof fetch
): Promise<Entity[]> => {
	return readOrFetchItem('home-item', `index-${lang}`, fetchSvelte, EntitiesSchema);
};

export const readOrFetchBlogPostIndex = async (
	lang: string,
	fetchSvelte: typeof fetch
): Promise<BlogPostInIndex[]> => {
	return readOrFetchItem('blog-post', `index-${lang}`, fetchSvelte, BlogPostsIndexSchema);
};

export const readOrFetchBlogPost = async (
	{
		date,
		lang,
		slug,
	}: {
		date: string;
		lang: string;
		slug: string;
	},
	fetchSvelte: typeof fetch
): Promise<BlogPost> => {
	return readOrFetchItem('blog-post', `${date}-${lang}-${slug}`, fetchSvelte, BlogPostSchema);
};
