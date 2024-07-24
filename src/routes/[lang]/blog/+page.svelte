<script lang="ts">
	export let data;
</script>

<h1>Blog</h1>

<a href="/{data.lang}/">Back</a>

<ul>
	{#each data.blogPosts as post}
		<li>
			<a href={`/${data.lang}/blog/${post.urlName}`}>{post.attributes.title}</a>
		</li>
	{/each}
</ul>
