export interface DevTestList {
  readonly repoKey: string
  readonly description: string
  readonly starCount: number
  readonly tags: string[]
}

export const devTestLists: DevTestList[] = [
  {
    repoKey: 'sindresorhus/awesome-nodejs',
    description: 'Delightful Node.js packages and resources',
    starCount: 47_800,
    tags: ['node', 'nodejs', 'javascript'],
  },
  {
    repoKey: 'enaqx/awesome-react',
    description: 'A collection of awesome things regarding React ecosystem',
    starCount: 52_200,
    tags: ['react', 'react-native', 'react-tutorial', 'react-apps'],
  },
  {
    repoKey: 'RunaCapital/awesome-oss-alternatives',
    description: 'Awesome list of open-source startup alternatives to well-known SaaS products',
    starCount: 12_400,
    tags: ['open-source', 'alternatives'],
  },
]
