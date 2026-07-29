import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built folio can be served from any shelf — GitHub Pages included.
export default defineConfig({
  plugins: [react()],
  base: './',
});
