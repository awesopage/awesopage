const workspacePackages = require('./workspace-packages.json')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    dirs: [
      ...workspacePackages
        .map(({ name }) => name)
        .filter((name) => name.startsWith('ap-'))
        .map((name) => `packages/${name}/src`),
      'pages',
      '.eslintrc.js',
      'next.config.js',
    ],
  },
}

module.exports = nextConfig
