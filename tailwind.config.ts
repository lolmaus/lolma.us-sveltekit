import { join } from 'path';
import type { Config } from 'tailwindcss';
import containerQueries from '@tailwindcss/container-queries';
import aspectRatio from '@tailwindcss/aspect-ratio';
import { skeleton } from '@skeletonlabs/tw-plugin';

/**
 * {
 *   bp100: "6.25rem",
 *   bp200: "12.5rem",
 *   bp300: "18.75rem",
 *   ...
 *   bp2600: "162.5rem"
 * }
 */
const bps = Array(26)
	.fill(null)
	.reduce(
		(result, _item, index) => {
			const bpPxNum = (index + 1) * 100;
			const bpPxStr = `bp${bpPxNum}`;
			const bpRemNum = bpPxNum / 16;
			const bpRemStr = `${bpRemNum}rem`;

			result[bpPxStr] = bpRemStr;

			return result;
		},
		{} satisfies Record<string, string>
	);

export default {
	darkMode: 'selector',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
	],

	corePlugins: {
		aspectRatio: false,
	},

	theme: {
		containers: { ...bps },
		screens: { ...bps },
		extend: {},
	},

	plugins: [
		skeleton({
			themes: { preset: [{ name: 'gold-nouveau', enhancements: true }] },
		}),
		aspectRatio,
		containerQueries,
	],
} satisfies Config;
