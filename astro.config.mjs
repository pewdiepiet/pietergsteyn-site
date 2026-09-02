// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.pietergsteyn.com',
  image: {
    // Emit modern formats at the sizes the layout actually asks for.
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: 'always',
  },
});
