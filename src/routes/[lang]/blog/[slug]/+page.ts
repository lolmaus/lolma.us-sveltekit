import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
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
}