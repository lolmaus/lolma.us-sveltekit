<script lang="ts">
  export let data;
</script>

<h1>{data.attributes.title}</h1>

{@html data.html}

<a href={data.slug === '2024-07-04-en-hello-world' ? '/en/blog/foo-2024-07-05' : '/en/blog/hello-world-2024-07-04'}>Next</a>