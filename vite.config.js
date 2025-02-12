import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],

    css: {
        preprocessorOptions: {
          scss: {
            additionalData: ''
          }
        }
      },
      optimizeDeps: {
        include: ['@fontsource/atkinson-hyperlegible', '@fontsource/jetbrains-mono']
      },

    server: {
        fs: {
            // Allow serving files from one level up from the package root
            allow: ['..']
        },
        // HMR (Hot Module Replacement) configuration belongs under server
        hmr: {
            // Disable the overlay that shows errors in the browser
            overlay: false
        }
    },

    // Optimize how Vite handles markdown files
    assetsInclude: ['**/*.md']
});