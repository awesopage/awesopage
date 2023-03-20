export type TestListLike = Readonly<{
  owner: string
  repo: string
  likeEmails: string[]
}>

export const testListLikes: TestListLike[] = [
  {
    owner: 'owner1',
    repo: 'repo1',
    likeEmails: ['user1@example.com'],
  },
  {
    owner: 'owner1',
    repo: 'repo2',
    likeEmails: ['user2@example.com'],
  },
  {
    owner: 'owner2',
    repo: 'repo3',
    likeEmails: ['user1@example.com', 'user2@example.com'],
  },
]
