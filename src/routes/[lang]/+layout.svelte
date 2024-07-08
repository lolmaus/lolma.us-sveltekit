<script lang="ts">
	import { initFluentContext, Localized } from '@nubolab-ffwd/svelte-fluent';
	import type { PageData } from './$types';
	import type { Snippet } from 'svelte';

	let { data, children, header }: { data: PageData; children: Snippet; header: Snippet } = $props();

	initFluentContext(() => data.fluent);
</script>

<Localized id="hello" />

<div>
	<p>Children</p>

	{#if children}
		{@render children()}
	{/if}
</div>
