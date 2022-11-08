import './scripts/lib/dotenv-loader.mjs'

import fsp from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import bundleAnalyzer from '@next/bundle-analyzer'
import { globby } from 'globby'
import { createSecureHeaders } from 'next-secure-headers'

import { getProfiles } from './scripts/lib/script-utils.mjs'

const workspacePackages = JSON.parse(await fsp.readFile(new URL('./workspace-packages.json', import.meta.url)))
const scriptFiles = await globby(['scripts/**/*.mjs'])
const configFiles = ['.eslintrc.js', 'next.config.mjs', 'nyc.config.js', 'playwright.config.ts']

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
})
const profiles = getProfiles()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withBundleAnalyzer({
  headers: () => [{ source: '/(.*)', headers: createSecureHeaders() }],
  experimental: {
    swcPlugins: [...(process.env.COLLECT_COVERAGE ? [['swc-plugin-coverage-instrument', {}]] : [])],
  },
  distDir: profiles.includes('test') ? 'build/test/nextjs' : `build/${process.env.NODE_ENV}/nextjs`,
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
      ...scriptFiles,
      ...configFiles,
    ],
  },
  webpack: (config, { isServer }) => {
    // Based on https://github.com/prisma/prisma/issues/6327
    if (isServer) {
      config.externals.unshift(({ request }, callback) => {
        if (request === 'pkg-app-model/client') {
          return callback(
            undefined,
            `commonjs ${fileURLToPath(new URL('./packages/pkg-app-model/client', import.meta.url))}`,
          )
        }

        callback()
      })
    }

    return config
  },
})

export default nextConfig
