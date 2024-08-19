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
		'flex flex-col items-center justify-center space-y-8 p-4 py-12 @bp500:p-8 @bp800:p-12 @bp1000:flex-row @bp1000:space-x-12 @bp1000:space-y-0',
		classes
	)}
	{...restProps}
>
	<img src="/images/index/the-face.jpg" alt="" class="h-auto w-2/3 max-w-96 rounded-full" />

	<div class="space-y-4 text-center @bp1000:text-left">
		<h1 class="h1">
			<Localized id="index--title" />
		</h1>

		<!-- Bottom patting is necessary to work around a werid text clipping isseu -->
		<p class="gradient-heading h1 py-1">@lolmaus</p>

		<p class="h3">
			<Localized id="index--subtitle" />
		</p>
	</div>
</div>
