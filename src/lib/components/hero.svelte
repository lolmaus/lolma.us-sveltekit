<script lang="ts">
	import { Localized } from '@nubolab-ffwd/svelte-fluent';
	import { cn } from '$lib/helpers';

	const {
		// children,
		class: classes,
		...restProps
	}: {
		// children: Snippet;
		class?: string;
	} = $props();
</script>

<div
	class={cn(
		'flex flex-col items-center justify-center space-y-8 @bp500:flex-row @bp500:space-x-12 @bp500:space-y-0',
		classes
	)}
	{...restProps}
>
	<img src="/images/index/the-face.jpg" alt="" class="h-auto w-2/3 max-w-96 rounded-full" />

	<div class="space-y-4 text-center @bp500:text-left">
		<h1 class="gradient-heading h1">
			<Localized id="index--title" />
		</h1>

		<p class="h3">
			<Localized id="index--subtitle" />
		</p>
	</div>
</div>
