<script lang="ts">
	import { initFluentContext } from '@nubolab-ffwd/svelte-fluent';
	import type { PageData } from './$types';
	import type { Snippet } from 'svelte';

	let { data, children, header }: { data: PageData; children: Snippet; header: Snippet } = $props();

	initFluentContext(() => data.fluent);
</script>

{@render children()}
