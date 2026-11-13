import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const rootFiles = [
  'fedas-logo.svg', 'fedas-mark.svg', 'hero-fleet.webp', 'fleet-crafter.webp',
  'interior.webp', 'parcels.webp', 'og-cover.webp', 'robots.txt', 'site.webmanifest'
];

export default defineConfig({
  plugins: [react(), {
    name: 'copy-flat-root-assets',
    closeBundle() {
      const out = resolve('dist');
      if (!existsSync(out)) mkdirSync(out, { recursive: true });
      for (const file of rootFiles) {
        const source = resolve(file);
        if (existsSync(source)) copyFileSync(source, resolve(out, file));
      }
    }
  }],
  build: { sourcemap: false, target: 'es2020' }
});
