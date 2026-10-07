import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { defineConfig } from '@tanstack/react-start/config'

export default defineConfig({
  server: {
    prerender: {
      routes: ['/'], // Only prerender the root, letting client-side routing handle the rest
      crawlLinks: true, // Let it crawl to generate all pages statically
      concurrency: 1, // CRITICAL: Must be 1 to prevent Hostinger ETIMEDOUT bans
      failOnError: false // Keep building even if one route fetch fails
    }
  }
})
