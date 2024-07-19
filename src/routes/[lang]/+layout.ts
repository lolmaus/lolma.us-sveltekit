import { error } from '@sveltejs/kit';
import { FluentBundle, FluentResource } from '@fluent/bundle';
import { createSvelteFluent } from '@nubolab-ffwd/svelte-fluent';


export async function load({ params }) {
  const { lang } = params;
  
  if (lang !== 'en' && lang !== 'ru') {
    error(404, 'Not Found');
  }

	const bundle = new FluentBundle('en');
  const { default: translations } = await import(`../../../content/translations/${lang}.ftl?raw`);
  const resource = new FluentResource(translations);

	bundle.addResource(resource);

  return {
	 fluent: createSvelteFluent([bundle]),
   lang,
  };
}
