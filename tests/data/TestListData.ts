import type { PartialDeep } from 'type-fest'

import type { ListStatusEnum } from 'pkg-app-model/client'
import type { ListDTO, ListStatus } from 'pkg-app-shared/src/list/ListDTO'
import type { UserDTO } from 'pkg-app-shared/src/user/UserDTO'
import { expect } from 'tests/common/TestUtils'
import type { Predicate } from 'tests/data/TestDataFinder'
import { createTestDataFinder } from 'tests/data/TestDataFinder'
import { assertUser } from 'tests/data/TestUserData'

export type TestList = Readonly<{
  owner: string
  repo: string
  description: string
  starCount: number
  tags: string[]
  requestedByEmail: string
  approvedByEmail?: string
  currentStatus: ListStatusEnum
}>

export const testLists: TestList[] = [
  {
    owner: 'owner1',
    repo: 'repo1',
    description: 'Awesome List 1',
    starCount: 100_000,
    tags: ['topic1', 'topic2'],
    requestedByEmail: 'user1@example.com',
    approvedByEmail: 'reviewer2@example.com',
    currentStatus: 'ACTIVE',
  },
  {
    owner: 'owner1',
    repo: 'repo2',
    description: 'Awesome List 2',
    starCount: 50_000,
    tags: ['topic2', 'topic3'],
    requestedByEmail: 'user2@example.com',
    approvedByEmail: 'reviewer1@example.com',
    currentStatus: 'ACTIVE',
  },
  {
    owner: 'owner2',
    repo: 'repo3',
    description: 'Awesome List 3',
    starCount: 5_000,
    tags: ['topic1', 'topic3'],
    requestedByEmail: 'reviewer1@example.com',
    approvedByEmail: 'admin2@example.com',
    currentStatus: 'ACTIVE',
  },
  {
    owner: 'owner2',
    repo: 'repo4',
    description: 'Awesome List 4',
    starCount: 10_000,
    tags: ['topic2', 'topic4'],
    requestedByEmail: 'admin2@example.com',
    currentStatus: 'INACTIVE',
  },
  {
    owner: 'owner3',
    repo: 'repo5',
    description: 'Awesome List 5',
    starCount: 20_000,
    tags: ['topic1', 'topic4'],
    requestedByEmail: 'user2@example.com',
    approvedByEmail: 'reviewer1@example.com',
    currentStatus: 'INACTIVE',
  },
]

export const createExpectedList = (testList: TestList, overrides?: PartialDeep<ListDTO>): PartialDeep<ListDTO> => {
  const { owner, repo, description, starCount, tags, requestedByEmail, approvedByEmail, currentStatus } = testList

  const requestedBy: Partial<UserDTO> = {
    email: requestedByEmail,
  }

  const approvedBy: Partial<UserDTO> | undefined = approvedByEmail
    ? {
        email: approvedByEmail,
      }
    : undefined

  return {
    owner,
    repo,
    status: currentStatus,
    description,
    starCount,
    tags,
    requestedBy,
    isApproved: !!approvedByEmail,
    ...(approvedBy ? { approvedBy } : {}),
    ...overrides,
  }
}

export const assertList = (list: ListDTO, expectedList?: PartialDeep<ListDTO>) => {
  expect(list.id).toBeDefined()
  expect(list.updatedAt >= list.requestedAt).toBe(true)

  if (expectedList) {
    if (list.requestedBy) {
      assertUser(list.requestedBy, expectedList.requestedBy)
    }

    if (list.approvedBy) {
      assertUser(list.approvedBy, expectedList.approvedBy)
    }

    expect(list).toMatchObject(expectedList)
  }
}

export const testListFinder = createTestDataFinder(testLists, () => {
  const isRequestedBy = (email: string): Predicate<TestList> => {
    return ({ requestedByEmail }) => requestedByEmail === email
  }

  const hasStatus = (status: ListStatus): Predicate<TestList> => {
    return (list) => list.currentStatus === status
  }

  const isApproved: Predicate<TestList> = (list) => !!list.approvedByEmail

  return { isRequestedBy, hasStatus, isApproved }
})
