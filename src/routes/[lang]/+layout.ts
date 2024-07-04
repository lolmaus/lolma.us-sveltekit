import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { lang } = params;
  
  if (lang !== 'en' && lang !== 'ru') {
    error(404, 'Not Found');
  }
}