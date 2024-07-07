<script lang="ts">
	import { building } from "$app/environment";

  if (!building) {
    // @ts-expect-error Intentionally checking for non-spec userLanguage
    const langRaw = navigator.language || navigator.userLanguage || 'en-US';
    const lang = langRaw.slice(0, 2);

    window.location.replace(`/${lang}/`);
  }
</script>

<noscript>
  <h1>Pick your language:</h1>

  <ul>
    <li>
      <a href="/en">English</a>
    </li>
    <li>
      <a href="/ru">Русский</a>
    </li>
  </ul>
</noscript>