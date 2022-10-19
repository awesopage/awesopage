require('./scripts/lib/dotenv-loader')

const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
})

const workspacePackages = require('./workspace-packages.json')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withBundleAnalyzer({
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    dirs: [
      ...workspacePackages
        .map(({ name }) => name)
        .filter((name) => name.startsWith('pkg-'))
        .map((name) => `packages/${name}/src`),
      'pages',
      'scripts',
      '.eslintrc.js',
      'next.config.js',
    ],
  },
  webpack: (config, { isServer }) => {
    // Based on https://github.com/prisma/prisma/issues/6327
    if (isServer) {
      config.externals.unshift(({ request }, callback) => {
        if (request === 'pkg-app-model/client') {
          return callback(undefined, `commonjs ${path.join(__dirname, 'packages/pkg-app-model/client')}`)
        }

        callback()
      })
    }

    return config
  },
})

module.exports = nextConfig
