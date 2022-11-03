require('./scripts/lib/dotenv-loader')

const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
})

const { getProfiles } = require('./scripts/lib/script-utils')
const workspacePackages = require('./workspace-packages.json')

const profiles = getProfiles()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withBundleAnalyzer({
  experimental: {
    swcPlugins: [...(process.env.COLLECT_COVERAGE ? [['swc-plugin-coverage-instrument', {}]] : [])],
  },
  distDir:
    process.env.NODE_ENV === 'production' ? 'dist' : profiles.includes('test') ? 'test-output/build/nextjs' : undefined,
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
      'packages/pkg-testing/global-setup.js',
      'packages/pkg-testing/global-teardown.js',
      '.eslintrc.js',
      'next.config.js',
      'nyc.config.js',
      'playwright.config.ts',
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
