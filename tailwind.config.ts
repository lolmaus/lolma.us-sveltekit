import { join } from 'path';
import type { Config } from 'tailwindcss';
import containerQueries from '@tailwindcss/container-queries';
import aspectRatio from '@tailwindcss/aspect-ratio';

import { skeleton } from '@skeletonlabs/tw-plugin';

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
		containers: {
			bp100: '12.5rem',
			bp200: '25.0rem',
			bp300: '37.5rem',
			bp400: '50.0rem',
			bp500: '62.5rem',
			bp600: '75.0rem',
			bp700: '87.5rem',
			bp800: '100.0rem',
			bp900: '112.5rem',
			bp1000: '125.0rem',
			bp1100: '137.5rem',
			bp1200: '150.0rem',
			bp1300: '162.5rem',
			bp1400: '175.0rem',
			bp1500: '187.5rem',
			bp1600: '200.0rem',
			bp1700: '212.5rem',
			bp1800: '225.0rem',
			bp1900: '237.5rem',
			bp2000: '250.0rem',
			bp2100: '262.5rem',
			bp2200: '275.0rem',
			bp2300: '287.5rem',
			bp2400: '300.0rem',
			bp2500: '312.5rem',
			bp2600: '325.0rem',
		},
		screens: {
			bp100: '12.5rem',
			bp200: '25.0rem',
			bp300: '37.5rem',
			bp400: '50.0rem',
			bp500: '62.5rem',
			bp600: '75.0rem',
			bp700: '87.5rem',
			bp800: '100.0rem',
			bp900: '112.5rem',
			bp1000: '125.0rem',
			bp1100: '137.5rem',
			bp1200: '150.0rem',
			bp1300: '162.5rem',
			bp1400: '175.0rem',
			bp1500: '187.5rem',
			bp1600: '200.0rem',
			bp1700: '212.5rem',
			bp1800: '225.0rem',
			bp1900: '237.5rem',
			bp2000: '250.0rem',
			bp2100: '262.5rem',
			bp2200: '275.0rem',
			bp2300: '287.5rem',
			bp2400: '300.0rem',
			bp2500: '312.5rem',
			bp2600: '325.0rem',
		},
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
