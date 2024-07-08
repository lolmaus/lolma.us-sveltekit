import path from 'node:path';
import fs from 'node:fs';
import MarkdownIt, { type Options as MarkdownItOptions } from 'markdown-it';
import Frontmatter, { type FrontMatterResult } from 'front-matter';
import assert from 'tiny-invariant';
import type { MakeDirectoryOptions, PathLike } from 'node:fs';
import EsExtensionsNode from '@yamato-daiwa/es-extensions-nodejs';
import type { Entity } from '$lib/entities';

const { isErrnoException } = EsExtensionsNode;

export interface ParseMarkdownConfig {
	sourceDir?: string;
	outputDir?: string;
	markdownItOptions?: MarkdownItOptions;
	entities: Record<string, EntityConfig>;
}

export interface EntityConfig {
	individual: boolean;
	index: boolean;
	htmlInIndex?: boolean;
	paginationInIndex?: number;
}

export interface MyFile {
	fileName: string;
	fullName: string;
	content: string;
}

interface FrontMatterResultWithSlug<T> extends FrontMatterResult<T> {
	fileName: string;
}

const parseMarkdown = (config: ParseMarkdownConfig) => {
	return {
		name: 'rollup-plugin-parse-markdown',
		async buildStart() {
			const cwd = process.cwd();
			const sourceDir = config.sourceDir ?? path.resolve(cwd, 'content');
			const outputDir = config.outputDir ?? path.resolve(cwd, 'static/content');

			for (const entityName in config.entities) {
				const { individual, index /* , htmlInIndex, paginationInIndex */ } =
					config.entities[entityName];

				assert(
					individual || index,
					`At least one of 'individual' or 'index' must be true for entity '${entityName}'`
				);

				const entitySourceDir = path.join(sourceDir, entityName);
				const entityOutputDir = path.join(outputDir, entityName);

				await mkdirIfNotExists(entityOutputDir);

				const files: MyFile[] = await readFiles(entitySourceDir);

				const frontMattersWithSlug: FrontMatterResultWithSlug<unknown>[] = files.map(
					(file: MyFile): FrontMatterResultWithSlug<unknown> => {
						return {
							...Frontmatter(file.content),
							fileName: file.fileName.replace(/\.md$/, '')
						};
					}
				);

				if (individual || index) {
					await generateFiles(
						frontMattersWithSlug,
						entityOutputDir,
						config,
						config.entities[entityName]
					);
				}
			}
		}
	};
};

const readFiles = async (sourcePath: string): Promise<MyFile[]> => {
	const fileNamesAll = await fs.promises.readdir(sourcePath);
	const fileNamesMd = fileNamesAll.filter((fileName) => fileName.endsWith('.md'));

	return Promise.all(
		fileNamesMd.map(async (fileName: string) => {
			const fullName = path.join(sourcePath, fileName);
			const content = await fs.promises.readFile(fullName, 'utf8');
			return {
				fileName,
				fullName,
				content
			};
		})
	);
};

export const mkdirIfNotExists = async (
	path: PathLike,
	options: MakeDirectoryOptions = { recursive: true }
): Promise<void> => {
	try {
		await fs.promises.mkdir(path, options);
	} catch (error) {
		if (isErrnoException(error) && error.code !== 'EEXIST') throw error;
	}
};

export const generateFiles = async (
	frontMattersWithSlug: FrontMatterResultWithSlug<unknown>[],
	outputDir: string,
	config: ParseMarkdownConfig,
	entityConfig: EntityConfig
) => {
	const markdownCompiler = new MarkdownIt({
		...(config.markdownItOptions ?? {}),
		html: true
	});

	const entities: Entity[] = frontMattersWithSlug.map(
		(fm: FrontMatterResultWithSlug<unknown>): Entity => {
			const parsed = fm.fileName.match(/^(?:(\d\d\d\d-\d\d-\d\d)-)?(\w\w)-(.+)$/);

			assert(parsed, 'Invalid filename format');

			const [, date, lang, slug] = parsed;

			return {
				attributes: fm.attributes,
				html: markdownCompiler.render(fm.body),
				fileName: fm.fileName,
				date,
				lang,
				slug,
				urlName: date ? `${slug}-${date}` : slug
			};
		}
	);

	if (entityConfig.individual) {
		for (const entity of entities) {
			const outputFilePath = path.join(outputDir, `${entity.fileName}.json`);
			const entityStr = JSON.stringify(entity, null, 2);
			await fs.promises.writeFile(outputFilePath, entityStr);
		}
	}

	if (entityConfig.index) {
		const index = entityConfig.htmlInIndex
			? entities
			: entities.map((entity) => ({ ...entity, html: undefined }));

		const indexesPerLanguage: Record<string, Entity[]> = index.reduce(
			(result: Record<string, Entity[]>, entity: Entity) => {
				if (!result[entity.lang]) {
					result[entity.lang] = [];
				}

				result[entity.lang].push(entity);

				return result;
			},
			{}
		);

		for (const lang in indexesPerLanguage) {
			const indexLang = indexesPerLanguage[lang];
			const outputFilePath = path.join(outputDir, `index-${lang}.json`);
			const indexStr = JSON.stringify(indexLang, null, 2);
			await fs.promises.writeFile(outputFilePath, indexStr);
		}
	}
};

export default parseMarkdown;
