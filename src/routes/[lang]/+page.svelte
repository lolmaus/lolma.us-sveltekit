<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import MainContent from '$lib/components/main-content.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	export let data;
</script>

<div class="relative min-h-screen w-full bp1000:flex bp1000:items-center">
	<header
		class="h-[80vh] border @container max-bp1000:max-h-[100vw] bp1000:sticky bp1000:top-0 bp1000:h-[100vh] bp1000:w-1/2"
	>
		<Hero class="h-full" />

		<div></div>
	</header>

	<main class="border @container bp1000:w-1/2 bp1000:max-w-[1718px]">
		<MainContent class="h-full" lang={data.lang} items={data.homeItems} />
	</main>
</div>

<div class="bp1000:fixed bp1000:right-1/2 bp1000:top-10 bp1000:mr-12">
	<LightSwitch />
</div>
