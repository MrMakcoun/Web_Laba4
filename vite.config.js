import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    open: true,
    port: 3000,
    watch: { ignored: ['**/.lab-qa/**', '**/*.docx', '**/*.tmp'] },
  },
  build: { outDir: 'dist', emptyOutDir: true },
});
