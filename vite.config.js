import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// base './' lets the build work from any GitHub Pages sub-path.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'ஆங்கிலம் படிப்போம்',
        short_name: 'படிப்போம்',
        description: '30-day English reading and pronunciation course for Tamil speakers',
        lang: 'ta',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#F3F7F5',
        theme_color: '#0E6B5B',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Everything the app needs (code, styles, icons, recorded clips) is stored for offline use.
        globPatterns: ['**/*.{js,css,html,png,svg,json,mp3,m4a,webm,ogg}'],
        navigateFallback: 'index.html',
        runtimeCaching: [
          { urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i, handler: 'StaleWhileRevalidate', options: { cacheName: 'gfonts-css' } },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'gfonts-files', expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }, cacheableResponse: { statuses: [0, 200] } },
          },
        ],
      },
    }),
  ],
})
