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
        .filter((name) => name.startsWith('ap-'))
        .flatMap((name) => [`packages/${name}/src`, `packages/${name}/test`]),
      'pages',
      'scripts',
      'test',
      '.eslintrc.js',
      'next.config.js',
    ],
  },
})

module.exports = nextConfig
