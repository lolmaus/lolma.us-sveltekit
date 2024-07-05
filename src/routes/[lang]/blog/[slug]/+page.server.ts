import { error } from '@sveltejs/kit';
import path from 'node:path';
import fs from 'node:fs';

export const load = async ({ params }) => {
  const { lang, slug } = params;

  const parsed = slug.match(/^(.+)-(\d\d\d\d-\d\d-\d\d)$/);
  
  if (!parsed) {
    error(404, 'Not Found');
  }

  const [, name, date] = parsed;
  const cwd = process.cwd();
  const fullName = path.join(cwd, 'static', 'content', 'blog-post', `${date}-${lang}-${name}.json`);

  try {
    const jsonStr = await fs.promises.readFile(fullName, 'utf8');
    console.log('Server!', jsonStr);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.log(error);
    throw error
  }
}