<script lang="ts">
	import { cn } from '$lib/helpers';
	import type { BlogPostInIndex, Entity } from '$lib/entities';
	import { keyBy } from 'lodash-es';
	import { Localized } from '@nubolab-ffwd/svelte-fluent';

	const {
		// children,
		class: classes,
		blogPosts,
		homeItems,
		lang,
		...restProps
	}: {
		// children: Snippet;
		class?: string;
		blogPosts: BlogPostInIndex[];
		homeItems: Entity[];
		lang: string;
	} = $props();

	const itemsBySlug = $derived(keyBy(homeItems, 'slug'));
</script>

<div
	class={cn(
		'flex flex-wrap items-start justify-around gap-12 p-4 @bp500:p-8 @bp800:max-w-[calc(1200px+3rem)] @bp800:p-12 @bp1100:max-w-[calc(1800px+6rem)]',
		classes
	)}
	{...restProps}
>
	<div
		class="flex w-full flex-wrap items-start gap-12 @bp800:w-[calc(50%-1.5rem)] @bp1100:w-[calc(66%-1.5rem)]"
	>
		<a class="card card-hover block w-full @bp1100:w-[calc(50%-1.5rem)]" href="/{lang}/resume/">
			<header class="aspect-h-1 aspect-w-3">
				<img
					class="rounded-t object-cover object-center"
					src="https://preview.redd.it/7lf8pv72ox071.png?width=640&crop=smart&auto=webp&s=abec117db6c94ff3ba5a1c133ea1b380d9079f12"
					alt="beautiful landscape and a racecar"
				/>
			</header>

			<h2 class="h2 p-4 pb-0">
				<Localized id="main-content--cv--title" /> →
			</h2>

			<div class="prose prose-2 p-4">
				<!-- ToDo: remove the if condition when ru resume is available -->
				{#if itemsBySlug.resume}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html itemsBySlug.resume.html}
				{/if}
			</div>
		</a>

		<div class="w-full @bp1100:w-[calc(50%-1.5rem)]">
			<a href="/{lang}/blog/" class="card card-hover block">
				<header class="aspect-h-1 aspect-w-3">
					<img
						class="rounded-t object-cover object-center"
						src="https://preview.redd.it/njnqd082ox071.png?width=3440&format=png&auto=webp&s=281369f737625b114fe6b05a3b4a2255ea084ad4"
						alt="beautiful landscape and a racecar"
					/>
				</header>

				<h2
					class="h2 mb-[-1px] border border-t-0 bg-surface-100 p-4 dark:border-surface-700 dark:bg-surface-800"
				>
					<Localized id="main-content--blog--title" /> →
				</h2>
			</a>

			<div>
				<ul>
					{#each blogPosts as post}
						<li class="group">
							<a
								href="/{lang}/blog/{post.urlName}"
								class="card card-hover block rounded-none p-4 group-last:rounded-b"
							>
								<h3 class="h5">
									{post.attributes.title}
								</h3>

								<p>
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html post.attributes.teaser}
								</p>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<a
		class="card card-hover block w-full @bp800:w-[calc(50%-1.5rem)] @bp1100:w-[calc(33%-1.5rem)]"
		href="/{lang}/blog/sadf"
	>
		<header class="aspect-h-1 aspect-w-3">
			<img
				class="rounded-t object-cover object-center"
				src="https://preview.redd.it/1kxr7v72ox071.png?width=3440&format=png&auto=webp&s=3f6434a979e46c5feead86d4ac2b8003b99ade67"
				alt="beautiful landscape and a racecar"
			/>
		</header>

		<h2 class="h2 p-4 pb-0">
			<Localized id="main-content--about--title" /> →
		</h2>

		<div class="prose prose-2 p-4">
			<!-- ToDo: remove the if condition when ru resume is available -->
			{#if itemsBySlug['about-site']}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html itemsBySlug['about-site'].html}
			{/if}
		</div>
	</a>
</div>
