import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    (() => {
      const configDir = path.dirname(fileURLToPath(import.meta.url));
      const imagesDir = path.join(configDir, 'public', 'images');

      const getGalleryImages = () => {
        let files: string[] = [];
        try {
          files = fs.readdirSync(imagesDir);
        } catch {
          files = [];
        }

        const allowedExtensions = new Set([
          '.jpg',
          '.jpeg',
          '.png',
          '.webp',
          '.avif',
          '.gif',
        ]);

        return files
          .filter((fileName) => {
            const ext = path.extname(fileName).toLowerCase();
            if (!allowedExtensions.has(ext)) return false;

            const lower = fileName.toLowerCase();
            if (lower.startsWith('insert.')) return false;

            const normalized = lower.replace(/\s+/g, ' ').trim();
            if (/^\d+\s*pre\./.test(normalized)) return false;
            if (/^\d+\s*dopo\./.test(normalized)) return false;
            if (/^\d+pre\./.test(normalized)) return false;

            return true;
          })
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
          .map((fileName) => encodeURI(`/images/${fileName}`));
      };

      const virtualId = 'virtual:gallery-images';
      const resolvedVirtualId = `\0${virtualId}`;

      return {
        name: 'gallery-images-virtual-module',
        resolveId(id: string) {
          if (id === virtualId) return resolvedVirtualId;
        },
        load(id: string) {
          if (id !== resolvedVirtualId) return;
          return `export const galleryImages = ${JSON.stringify(getGalleryImages())};`;
        },
        configureServer(server: { watcher: { add: (path: string) => void } }) {
          server.watcher.add(imagesDir);
        },
        handleHotUpdate(ctx: {
          file: string;
          server: {
            moduleGraph: {
              getModuleById: (id: string) => unknown;
              invalidateModule: (mod: unknown) => void;
            };
          };
        }) {
          if (!ctx.file.startsWith(imagesDir)) return;

          const mod = ctx.server.moduleGraph.getModuleById(resolvedVirtualId);
          if (!mod) return;

          ctx.server.moduleGraph.invalidateModule(mod);
          return [mod];
        },
      };
    })(),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
