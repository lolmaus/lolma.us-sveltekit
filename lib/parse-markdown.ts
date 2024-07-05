import path from 'node:path';
import fs from 'node:fs';
import MarkdownIt, { type Options as MarkdownItOptions } from 'markdown-it';
import Frontmatter, { type FrontMatterResult } from 'front-matter';
import assert from 'tiny-invariant';
import type { MakeDirectoryOptions, PathLike } from 'node:fs';
import EsExtensionsNode from '@yamato-daiwa/es-extensions-nodejs';

const { isErrnoException } = EsExtensionsNode;

export interface ParseMarkdownConfig {
	sourceDir?: string;
	outputDir?: string;
	markdownItOptions?: MarkdownItOptions;
	entities: Record<
		string,
		{
			individual: boolean;
			index: boolean;
			htmlInIndex?: boolean;
			paginationInIndex?: number;
		}
	>;
}

export interface MyFile {
	fileName: string;
	fullName: string;
	content: string;
}

export interface Entity {
	slug: string;
	attributes: unknown;
	html: string;
}

interface FrontMatterResultWithSlug<T> extends FrontMatterResult<T> {
	slug: string;
}

const parseMarkdown = (config: ParseMarkdownConfig) => {
	return {
		name: 'rollup-plugin-parse-markdown',
		async buildStart() {
			const cwd = process.cwd();
			const sourceDir = config.sourceDir ?? path.resolve(cwd, 'content');
			const outputDir = config.outputDir ?? path.resolve(cwd, 'static/content');

			for (const entity in config.entities) {
				const { individual, index /* , htmlInIndex, paginationInIndex */ } =
					config.entities[entity];

				assert(
					individual || index,
					`At least one of 'individual' or 'index' must be true for entity '${entity}'`
				);

				const entitySourceDir = path.join(sourceDir, entity);
				const entityOutputDir = path.join(outputDir, entity);
				console.log('entityOutputDir', entityOutputDir)
				await mkdirIfNotExists(entityOutputDir);

				const files: MyFile[] = await readFiles(entitySourceDir);

				const frontMattersWithSlug: FrontMatterResultWithSlug<unknown>[] = files.map(
					(file: MyFile): FrontMatterResultWithSlug<unknown> => {
						return {
							...Frontmatter(file.content),
							slug: file.fileName.replace(/\.md$/, '')
						};
					}
				);

				if (individual) {
					await generateIndividualMarkdownFiles(frontMattersWithSlug, entityOutputDir, config);
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

const generateIndividualMarkdownFiles = async (
	frontMattersWithSlug: FrontMatterResultWithSlug<unknown>[],
	outputDir: string,
	config: ParseMarkdownConfig
) => {
	const markdownCompiler = new MarkdownIt({
		...(config.markdownItOptions ?? {}),
		html: true
	});

	const entities: Entity[] = frontMattersWithSlug.map(
		(fm: FrontMatterResultWithSlug<unknown>): Entity => {
			return {
				attributes: fm.attributes,
				html: markdownCompiler.render(fm.body),
				slug: fm.slug
			};
		}
	);

	for (const entity of entities) {
		const outputFilePath = path.join(outputDir, `${entity.slug}.json`);
		const entityStr = JSON.stringify(entity, null, 2);
		await fs.promises.writeFile(outputFilePath, entityStr);
	}
};

export default parseMarkdown;
