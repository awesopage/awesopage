import fastSort from 'fast-sort'

import type { ListDTO } from 'pkg-app-shared/src/list/ListDTO'
import { createListApiConfig, findActiveListsApiConfig } from 'pkg-app-shared/src/list/ListsApiConfig'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { testListFinder } from 'tests/data/TestListData'
import { testUserFinder, withAuth } from 'tests/data/TestUserData'

const createList = createTestApiRequest(createListApiConfig)
const findActiveLists = createTestApiRequest(findActiveListsApiConfig)

test.describe(createListApiConfig.name, () => {
  test.describe('given signed in', () => {
    const user = testUserFinder.any(({ hasNoRole }) => hasNoRole)

    withAuth(user)

    test('should return correct list', async ({ request }) => {
      const createListResponse = await createList(request, {
        owner: 'test_owner',
        repo: 'test_repo',
      })
      const list = await createListResponse.json()

      const expectedList: Partial<ListDTO> = {
        owner: 'test_owner',
        repo: 'test_repo',
        status: 'INACTIVE',
        description: '',
        starCount: 0,
        tags: [],
        isApproved: false,
      }

      expect(list).toMatchObject(expectedList)
      expect(list.requestedBy.email).toBe(user.email)
    })
  })
})

test.describe(createListApiConfig.name, () => {
  test.describe('given not signed in', () => {
    test('should return error', async ({ request }) => {
      const createListResponse = await createList(request, {
        owner: 'test_owner',
        repo: 'test_repo',
      })

      expect(createListResponse.ok()).toBe(false)
    })
  })
})

test.describe(createListApiConfig.name, () => {
  test.describe('given list already exists', () => {
    const testList = testListFinder.any()

    withAuth(testUserFinder.any(({ hasNoRole }) => hasNoRole))

    test('should return error', async ({ request }) => {
      const createListResponse = await createList(request, {
        owner: testList.owner,
        repo: testList.repo,
      })

      expect(createListResponse.ok()).toBe(false)
    })
  })
})

test.describe(findActiveListsApiConfig.name, () => {
  const testActiveLists = testListFinder.all(({ isApproved, hasStatus, and }) => and(isApproved, hasStatus('ACTIVE')))
  fastSort.inPlaceSort(testActiveLists).asc(['owner', 'repo'])

  test('should return correct lists', async ({ request }) => {
    const findActiveListsResponse = await findActiveLists(request)
    const activeLists = await findActiveListsResponse.json()
    fastSort.inPlaceSort(activeLists).asc(['owner', 'repo'])

    const expectedActiveLists = testActiveLists.map(
      (testActiveList): Partial<ListDTO> => ({
        owner: testActiveList.owner,
        repo: testActiveList.repo,
        status: 'ACTIVE',
        isApproved: true,
        description: testActiveList.description,
        starCount: testActiveList.starCount,
        tags: testActiveList.tags,
      }),
    )

    expect(activeLists.length).toBe(expectedActiveLists.length)

    activeLists.forEach((activeList, index) => {
      expect(activeList).toMatchObject(expectedActiveLists[index] ?? {})
    })
  })
})
