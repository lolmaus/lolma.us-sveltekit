<script lang="ts">
  // @ts-expect-error Intentionally checking for non-spec userLanguage
  const langRaw = navigator.language || navigator.userLanguage || 'en-US';
  const lang = langRaw.slice(0, 2);

  window.location.replace(`/${lang}/`);
</script>
