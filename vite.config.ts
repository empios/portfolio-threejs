import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base URL set to root '/' for custom domain www.pawelvlodarczyk.pl
export default defineConfig({
  plugins: [react()],
  base: '/',
});
