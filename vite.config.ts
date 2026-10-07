import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import dns from 'node:dns';

// Force IPv4 resolution to prevent ETIMEDOUT ::1 on Hostinger
dns.setDefaultResultOrder('ipv4first');

export default defineConfig({
  nitro: false,
  tanstackStart: {
    server: {
      prerender: {
        routes: ['/'],
        crawlLinks: true,
        concurrency: 1 // Keep concurrency at 1 for shared hosting limits
      }
    }
  }
});
