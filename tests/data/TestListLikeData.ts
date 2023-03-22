import type { Predicate } from 'tests/data/TestDataFinder'
import { createTestDataFinder } from 'tests/data/TestDataFinder'

export type TestListLike = Readonly<{
  owner: string
  repo: string
  likedByEmails: string[]
}>

export const testListLikes: TestListLike[] = [
  {
    owner: 'owner1',
    repo: 'repo1',
    likedByEmails: ['user1@example.com'],
  },
  {
    owner: 'owner1',
    repo: 'repo2',
    likedByEmails: ['user2@example.com'],
  },
  {
    owner: 'owner2',
    repo: 'repo3',
    likedByEmails: ['user1@example.com', 'user2@example.com'],
  },
]

export const testListLikeFinder = createTestDataFinder(testListLikes, () => {
  const isLikedBy = (email: string): Predicate<TestListLike> => {
    return ({ likedByEmails }) => likedByEmails.includes(email)
  }

  return { isLikedBy }
})
