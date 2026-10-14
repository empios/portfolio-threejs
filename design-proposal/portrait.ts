import type { Localized } from '../src/i18n/locale';

export { IDENTITY } from '../src/content/site';

/**
 * Your portrait. Drop a photo into `public/` (e.g. `public/portrait.jpg`,
 * 4:5, at least 960×1200, face in the upper third) and point `src` at it.
 * Until then the About section shows a placeholder.
 */
export const PORTRAIT: { readonly src: string; readonly alt: Localized<string> } | null = null;
