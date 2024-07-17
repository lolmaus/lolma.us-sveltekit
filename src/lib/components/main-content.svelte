<script lang="ts">
	import { Localized } from '@nubolab-ffwd/svelte-fluent';
	import { cn } from '$lib/helpers';
	import type { Entity } from '$lib/entities';
	import { keyBy } from 'lodash-es';

	const {
		// children,
		class: classes,
		items,
		lang,
		...restProps
	}: {
		// children: Snippet;
		class?: string;
		items: Entity[];
		lang: string;
	} = $props();

	const itemsBySlug = $derived(keyBy(items, 'slug'));
</script>

<div
	class={cn(
		'p-12 space-y-8 @container',
		classes
	)}
	{...restProps}
>
	<div class="w-full flex flex-wrap justify-stretch gap-12 space-y-0 items-start">
		<a class="card card-hover flex-grow w-0 basis-64" href="/{lang}/resume">
			<header class="aspect-w-3 aspect-h-1">
				<img class="object-cover object-center" src="https://preview.redd.it/7lf8pv72ox071.png?width=640&crop=smart&auto=webp&s=abec117db6c94ff3ba5a1c133ea1b380d9079f12" alt="beautiful landscape and a racecar">
			</header>
			
			<div class="p-4 prose prose-2">
				{@html itemsBySlug.resume.html}
			</div>
		</a>

		<div class="card flex-grow w-0 basis-64">
			<header class="aspect-w-3 aspect-h-1">
				<img class="object-cover object-center" src="https://preview.redd.it/njnqd082ox071.png?width=3440&format=png&auto=webp&s=281369f737625b114fe6b05a3b4a2255ea084ad4" alt="beautiful landscape and a racecar">
			</header>

			Blog
		</div>

		<div class="card flex-grow w-0 basis-64">
			<header class="aspect-w-3 aspect-h-1">
				<img class="object-cover object-center" src="https://preview.redd.it/1kxr7v72ox071.png?width=3440&format=png&auto=webp&s=3f6434a979e46c5feead86d4ac2b8003b99ade67" alt="beautiful landscape and a racecar">
			</header>

			About
		</div>
	</div>
</div>
