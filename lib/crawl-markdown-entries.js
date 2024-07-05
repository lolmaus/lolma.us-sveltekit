import path from 'node:path';
import fs from 'node:fs';
import assert from 'tiny-invariant';

export function crawlMarkdownEntries(contentDir = 'content') {
	const cwd = process.cwd();
	const blogPostPath = path.join(cwd, contentDir, 'blog-post');

  return [
    '*',
    '/en',
    '/en/blog',

    // Blog — individual posts
    ...fs
      .readdirSync(blogPostPath)
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => filename.slice(0, -3))
      .map((filename) => {
        const parsed = filename.match(/^(\d\d\d\d-\d\d-\d\d)-(\w\w)-(.+)$/);

        assert(parsed, 'Invalid filename format');

        const [, date, lang, slug] = parsed;
        return `/${lang}/blog/${slug}-${date}`;
      })
  ];
}
