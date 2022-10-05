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
        .flatMap((name) => [`packages/${name}/src`, `packages/${name}/test`]),
      'pages',
      'test',
      '.eslintrc.js',
      'next.config.js',
    ],
  },
}

module.exports = nextConfig
