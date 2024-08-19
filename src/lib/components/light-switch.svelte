<script lang="ts">
	// Borrowed from Skeleton v2 LightSwitch component.
	// See the Custom Component section here:
	// https://www.skeleton.dev/docs/dark-mode

	import { onMount } from 'svelte';
	import {
		modeCurrent,
		setModeUserPrefers,
		setModeCurrent,
		setInitialClassState,
		getModeOsPrefers,
		type SvelteEvent,
	} from '@skeletonlabs/skeleton';

	import { Sun, Moon } from 'lucide-svelte';

	// Props
	/** Customize the `title` attribute for the component.  */
	export let title = 'Toggle light or dark mode.';

	function onToggleHandler(): void {
		$modeCurrent = !$modeCurrent;
		setModeUserPrefers($modeCurrent);
		setModeCurrent($modeCurrent);
	}

	// A11y Input Handlers
	function onKeyDown(event: SvelteEvent<KeyboardEvent, HTMLDivElement>): void {
		// Enter/Space triggers selection event
		if (['Enter', 'Space'].includes(event.code)) {
			event.preventDefault();
			event.currentTarget.click();
		}
	}

	// Lifecycle
	onMount(() => {
		// Sync lightswitch with the theme
		if (!('modeCurrent' in localStorage)) {
			setModeCurrent(getModeOsPrefers());
		}
	});
</script>

<svelte:head>
	<!-- Workaround for a svelte parsing error: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<div
	class="variant-soft btn-icon btn-lg cursor-pointer bg-surface-500 text-white opacity-50 hover:opacity-100"
	onclick={onToggleHandler}
	onkeydown={onKeyDown}
	role="switch"
	aria-label="Light Switch"
	aria-checked={$modeCurrent}
	{title}
	tabindex="0"
>
	{#if $modeCurrent}
		<Moon size={30} />
	{:else}
		<Sun size={30} />
	{/if}
</div>
