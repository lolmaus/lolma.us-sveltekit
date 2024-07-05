<script lang="ts">
  export let data;
</script>

<h1>{data.blogPost.attributes.title}</h1>

{@html data.blogPost.html}

<a href={data.blogPost.slug === 'hello-world' ? '/en/blog/foo-2024-07-05' : '/en/blog/hello-world-2024-07-04'}>Next</a>