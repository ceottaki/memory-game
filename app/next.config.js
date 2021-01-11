const withOffline = require('next-offline')

const nextConfig = {
  // generateInDevMode: true,
  workboxOpts: {
    swDest: process.env.NEXT_EXPORT ? 'service-worker.js' : 'static/service-worker.js',
    maximumFileSizeToCacheInBytes: 10485760, // Caches files of up to 10MB.
    exclude: [
      /\.(?:png|jpg|jpeg|svg|webp)$/i, // Do not pre-cache images.
      /facebook-pixel\.js$/i, // Do not pre-cache tracking scripts.
      /twitter-universal-tag\.js$/i,
      /.?(?:build|react-loadable)(-manifest\.json)$|/i, // Do not pre-cache NextJS intermediate files.
      /^https:\/\/t\.co\//i, // Do not pre-cache CORS requests to analytics.
      /^https:\/\/www\.google-analytics\.com/i,
      /^https:\/\/analytics\.twitter\.com/i,
      /^https:\/\/.+\.facebook\.com/i,
      /^https:\/\/.+\.facebook\.net/i,
      /^https:\/\/static\.ads-twitter\.com/i
    ],
    runtimeCaching: [
      {
        // Caches images in a separate cache.
        urlPattern: /(\.(?:png|jpg|jpeg|svg|webp)$)|/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'imagesCache',
          expiration: {
            maxEntries: 50 // Only caches up to 50 images.
          }
        }
      },
      {
        // Caches the tracking scripts in a separate cache.
        urlPattern: /(?:facebook-pixel\.js$)|(?:twitter-universal-tag\.js$)/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'trackingScripts',
          expiration: {
            maxAgeSeconds: 24 * 60 * 60 // Caches for 24 hours max.
          }
        }
      },
      {
        // Never caches intermediate NextJS files.
        urlPattern: /.?(?:build|react-loadable)(-manifest\.json)$|/i,
        handler: 'NetworkOnly',
        options: {
          cacheName: 'nextJsFiles',
          expiration: {
            maxAgeSeconds: 1 // Caches for 1 second max (it shouldn't be caching anyhow because the strategy is network-only).
          }
        }
      },
      {
        // Never caches CORS tracking requests.
        urlPattern: /(?:^https:\/\/.+\.facebook\.com)|(?:^https:\/\/.+\.facebook\.net)|(?:^https:\/\/static\.ads-twitter\.com)|(?:^https:\/\/t\.co\/)|(?:^https:\/\/www\.google-analytics\.com)|(?:^https:\/\/analytics\.twitter\.com)/i,
        handler: 'NetworkOnly',
        options: {
          cacheName: 'trackingScripts',
          expiration: {
            maxAgeSeconds: 1 // Caches for 1 second max (it shouldn't be caching anyhow because the strategy is network-only).
          }
        }
      },
      {
        // General offline caching.
        urlPattern: /^https?.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200 // Caches up to 200 entries (we shouldn't really have that many).
          }
        }
      }
    ]
  },
  webpack: (config, options) => {
    return config
  },
  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/_next/static/service-worker.js'
      }
    ]
  }
}

module.exports = withOffline(nextConfig)
