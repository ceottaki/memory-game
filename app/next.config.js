// @ts-check
const isProd = process.env.NODE_ENV === 'production'

/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: false,
  skipWaiting: false
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
  basePath: isProd ? '/memory-game' : '',
  assetPrefix: isProd ? '/memory-game/' : '',
  images: {
    dangerouslyAllowSVG: true,
    domains: ['via.placeholder.com', 'ceottaki.github.io'],
    unoptimized: true
  }
  // generateInDevMode: true,
}

module.exports = withPWA(nextConfig)
