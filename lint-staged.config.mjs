export default {
	'*.{js,ts,svelte,css,scss,postcss,md,json}': [
		'prettier --write --plugin-search-dir=.',
		'prettier --check --plugin-search-dir=.',
	],
	'*.{js,ts,svelte}': 'eslint --fix',
	'**/*.{ts,svelte}': () => 'pnpm run check',
};
