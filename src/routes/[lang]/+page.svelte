<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import MainContent from '$lib/components/main-content.svelte';
	import type { BlogPostInIndex, Entity } from '$lib/entities.js';
	import LightSwitch from '$lib/components/light-switch.svelte';

	const { data } = $props();

	const {
		blogPosts,
		homeItems,
		lang,
	}: {
		blogPosts: BlogPostInIndex[];
		homeItems: Entity[];
		lang: string;
	} = data;

	const topPosts = $derived(blogPosts.slice(0, 3));
</script>

<div class="absolute right-4 top-4 z-[100]">
	<LightSwitch />
</div>

<div class="relative min-h-screen w-full bp1000:flex bp1000:items-center">
	<header
		class="h-[80vh] max-bp1000:max-h-[100vw] bp1000:fixed bp1000:left-0 bp1000:top-0 bp1000:h-[100vh] bp1000:w-1/2"
	>
		<Hero class="h-full" />

		<div></div>
	</header>

	<main class="bp1000:ml-[50%] bp1000:w-1/2 bp1000:max-w-[1718px]">
		<MainContent class="h-full" {lang} {homeItems} blogPosts={topPosts} />
	</main>
</div>
