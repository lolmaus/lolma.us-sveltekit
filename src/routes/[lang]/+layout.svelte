<script lang="ts">
	import { initFluentContext, Localized } from "@nubolab-ffwd/svelte-fluent";
	import type { PageData } from "./$types";
	import type { Snippet } from "svelte";
  
	let { data, children }: { data: PageData; children: Snippet } = $props();

	initFluentContext(() => data.fluent);
</script>

<Localized id="hello"/>

<ul>
  <li>
    <a href="/en">English</a>
  </li>
  <li>
    <a href="/ru">Русский</a>
  </li>
</ul>

{@render children()}
