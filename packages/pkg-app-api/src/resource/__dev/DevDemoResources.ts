/* eslint-disable sonarjs/no-duplicate-string */

export interface DevDemoResource {
  readonly url: string
  readonly type: 'CODE' | 'VIDEO' | 'WEBSITE'
  readonly links: DevDemoResourceLink[]
}

export interface DevDemoResourceLink {
  readonly listRepoKey: string
  readonly description: string
  readonly tags: string[]
}

export const devDemoResources: DevDemoResource[] = [
  {
    url: 'https://github.com/webtorrent/webtorrent',
    type: 'CODE',
    links: [
      {
        listRepoKey: 'sindresorhus/awesome-nodejs',
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
        listRepoKey: 'sindresorhus/awesome-nodejs',
        description: 'Minimalistic framework for server-rendered universal JavaScript web apps.',
        tags: ['packages', 'web-frameworks'],
      },
      {
        listRepoKey: 'enaqx/awesome-react',
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
        listRepoKey: 'sindresorhus/awesome-nodejs',
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
        listRepoKey: 'enaqx/awesome-react',
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
        listRepoKey: 'enaqx/awesome-react',
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
        listRepoKey: 'enaqx/awesome-react',
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
        listRepoKey: 'RunaCapital/awesome-oss-alternatives',
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
        listRepoKey: 'RunaCapital/awesome-oss-alternatives',
        description: 'Typo tolerant fuzzy search engine',
        tags: ['enterprise-search'],
      },
    ],
  },
]
