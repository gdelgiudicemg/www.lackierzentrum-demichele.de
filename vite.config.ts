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
      const imagesDir = path.join(configDir, 'public', 'images', 'gallerie');

      const getGalleryImages = () => {
        const allowedExtensions = new Set([
          '.jpg',
          '.jpeg',
          '.png',
          '.webp',
          '.avif',
          '.gif',
        ]);

        const shouldIncludeFile = (fileName: string) => {
          const ext = path.extname(fileName).toLowerCase();
          if (!allowedExtensions.has(ext)) return false;

          const lower = fileName.toLowerCase();
          if (lower.startsWith('insert.')) return false;

          const normalized = lower.replace(/\s+/g, ' ').trim();
          if (/^\d+\s*pre\./.test(normalized)) return false;
          if (/^\d+\s*dopo\./.test(normalized)) return false;
          if (/^\d+pre\./.test(normalized)) return false;

          return true;
        };

        const walk = (dir: string, relativeDir = ''): string[] => {
          let entries: fs.Dirent[] = [];
          try {
            entries = fs.readdirSync(dir, { withFileTypes: true });
          } catch {
            return [];
          }

          return entries.flatMap((entry) => {
            const entryPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
              const nextRelative = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
              return walk(entryPath, nextRelative);
            }

            if (!shouldIncludeFile(entry.name)) return [];

            const relativePath = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
            return [relativePath];
          });
        };

        return walk(imagesDir)
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
          .map((relativePath) => encodeURI(`/images/gallerie/${relativePath}`));
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
        configureServer(server) {
          server.watcher.add(imagesDir);
        },
        handleHotUpdate(ctx) {
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
