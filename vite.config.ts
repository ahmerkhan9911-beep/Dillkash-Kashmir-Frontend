import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import dns from 'node:dns';

// Force IPv4 resolution to prevent ETIMEDOUT ::1 on Hostinger
dns.setDefaultResultOrder('ipv4first');

export default defineConfig({
  nitro: false,
  tanstackStart: {
    prerender: {
      enabled: true,
      routes: ['/'],
      crawlLinks: true,
      concurrency: 1
    }
  },
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          secure: false,
          ws: true,
          configure: (proxy) => {
            proxy.on('error', (err, _req, res) => {
              if (res && 'writeHead' in res && typeof res.writeHead === 'function' && !res.headersSent) {
                res.writeHead(503, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Backend server is temporarily unavailable or restarting.' }));
              }
            });
          },
        },
        '/uploads': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on('error', (err, _req, res) => {
              if (res && 'writeHead' in res && typeof res.writeHead === 'function' && !res.headersSent) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Upload not found or backend unavailable.');
              }
            });
          },
        },
      },
    },
  },
});
