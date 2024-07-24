This website is meant as a demonstration of some of my skills.

It features:

### Svelte

- Svelte 5 with Runes;
- <abbr title="Static Site Rendering">SSR</abbr>: loads instantly as a static website, works with JS disabled;
- Hydration turns it into an <abbr title="Single Page Application">SPA</abbr> after static HTML is loaded;
- <abbr title="Internationalization">I18n</abbr>:
  - Bilingual;
  - Localization via Mozilla Fluent, not ICU;
  - Localization for UI and content both load on per-route basis;
- Markdown as content database;
- Hybrid data loading:
  - Reads from filesystem on build;
  - Fetches from static folder in browser.

### Custom Vite plugin

- Reads Markdown files from the `/content/` folder;
- Parses Markdown and Frontmatter into JSON;
- Also generates indices: arrays of items with HTML content omitted;
- Puts JSON into the `/static/` folder;
- Regenerates on change in dev mode, with hot reload.

### CSS and UI

- Tailwind;
- Skeleton UI;
- Dark mode;
- RWD with media and container queries.

### Nerdy stuff

- TypeScript.
- Zod for type-safe validation of Frontmatter.

### Upcoming

- Tests:
  - Unit
  - Acceptance;
- <abbr title="Accessibility">A11y</abbr>.

Click for an overview blog post.
