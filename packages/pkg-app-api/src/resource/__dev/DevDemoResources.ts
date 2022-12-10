/* eslint-disable sonarjs/no-duplicate-string */
import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { findListByOwnerAndRepo } from 'pkg-app-service/src/list/ListService'
import { createOrUpdateResource, linkResource } from 'pkg-app-service/src/resource/ResourceService'

export interface DevDemoResource {
  readonly url: string
  readonly type: 'CODE' | 'VIDEO' | 'WEBSITE'
  readonly links: DevDemoResourceLink[]
}

export interface DevDemoResourceLink {
  readonly listOwner: string
  readonly listRepo: string
  readonly description: string
  readonly tags: string[]
}

export const devDemoResources: DevDemoResource[] = [
  {
    url: 'https://github.com/webtorrent/webtorrent',
    type: 'CODE',
    links: [
      {
        listOwner: 'sindresorhus',
        listRepo: 'awesome-nodejs',
        description: 'Streaming torrent client for Node.js and the browser.',
        tags: ['packages', 'mad-science'],
      },
    ],
  },
  {
    url: 'https://github.com/vercel/next.js',
    type: 'CODE',
    links: [
      {
        listOwner: 'sindresorhus',
        listRepo: 'awesome-nodejs',
        description: 'Minimalistic framework for server-rendered universal JavaScript web apps.',
        tags: ['packages', 'web-frameworks'],
      },
      {
        listOwner: 'enaqx',
        listRepo: 'awesome-react',
        description: 'The React Framework',
        tags: ['react-tools', 'react-frameworks'],
      },
    ],
  },
  {
    url: 'https://github.com/thlorenz/v8-perf',
    type: 'CODE',
    links: [
      {
        listOwner: 'sindresorhus',
        listRepo: 'awesome-nodejs',
        description: 'Notes and resources related to V8 and thus Node.js performance.',
        tags: ['resources', 'miscellaneous'],
      },
    ],
  },
  {
    url: 'https://github.com/facebook/react-devtools',
    type: 'CODE',
    links: [
      {
        listOwner: 'enaqx',
        listRepo: 'awesome-react',
        description: 'Inspection of React component hierarchy in the Chrome and Firefox Developer Tools',
        tags: ['react-tools', 'react-development-tools'],
      },
    ],
  },
  {
    url: 'https://www.youtube.com/watch?v=x7cQ3mrcKaY',
    type: 'VIDEO',
    links: [
      {
        listOwner: 'enaqx',
        listRepo: 'awesome-react',
        description: 'Pete Hunt: React: Rethinking best practices - JSConf EU 2013',
        tags: ['videos', 'important-talks'],
      },
    ],
  },
  {
    url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox',
    type: 'WEBSITE',
    links: [
      {
        listOwner: 'enaqx',
        listRepo: 'awesome-react',
        description: 'A Complete Guide to Flexbox',
        tags: ['react-native', 'react-native-tutorials'],
      },
    ],
  },
  {
    url: 'https://gitpod.io',
    type: 'WEBSITE',
    links: [
      {
        listOwner: 'RunaCapital',
        listRepo: 'awesome-oss-alternatives',
        description: 'Automated provisioning of cloud development environments with multiple git providers & IDEs',
        tags: ['cloud-development-environment'],
      },
    ],
  },
  {
    url: 'https://typesense.org',
    type: 'WEBSITE',
    links: [
      {
        listOwner: 'RunaCapital',
        listRepo: 'awesome-oss-alternatives',
        description: 'Typo tolerant fuzzy search engine',
        tags: ['enterprise-search'],
      },
    ],
  },
]

export const createDemoResources = async () => {
  await prismaClient.$transaction(async (dbClient) => {
    for (const devDemoResource of devDemoResources) {
      const { type, url, links } = devDemoResource

      const resource = await createOrUpdateResource(dbClient, { url, type })

      for (const link of links) {
        const { description, listOwner, listRepo, tags } = link

        const list = await findListByOwnerAndRepo(dbClient, { owner: listOwner, repo: listRepo })

        await linkResource(dbClient, { resource, description, list, tags })
      }
    }
  })
}
