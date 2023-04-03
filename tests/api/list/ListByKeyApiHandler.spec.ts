import { findListByKeyApiConfig, updateListApiConfig } from 'pkg-app-shared/src/list/ListByKeyApiConfig'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { assertList, createExpectedList, testListFinder } from 'tests/data/TestListData'
import { testUserFinder, withAuth } from 'tests/data/TestUserData'

const updateList = createTestApiRequest(updateListApiConfig)
const findListByKey = createTestApiRequest(findListByKeyApiConfig)

test.describe(updateListApiConfig.name, () => {
  test.describe('given signed in as reviewer and list is unapproved', () => {
    const testList = testListFinder.any(({ isApproved, not }) => not(isApproved))

    withAuth(testUserFinder.any(({ hasRole }) => hasRole('REVIEWER')))

    test('should return correct list', async ({ request }) => {
      const updateListResponse = await updateList(request, {
        owner: testList.owner,
        repo: testList.repo,
        description: 'test_description',
        starCount: 99,
        tags: ['test_tag'],
      })
      const list = await updateListResponse.json()

      assertList(
        list,
        createExpectedList(testList, {
          description: 'test_description',
          starCount: 99,
          tags: ['test_tag'],
          isApproved: false,
        }),
      )
    })
  })
})

test.describe(updateListApiConfig.name, () => {
  test.describe('given signed in but not admin and list is approved', () => {
    const testList = testListFinder.any(({ isApproved }) => isApproved)

    withAuth(testUserFinder.any(({ hasRole, not }) => not(hasRole('ADMIN'))))

    test('should return error', async ({ request }) => {
      const updateListResponse = await updateList(request, {
        owner: testList.owner,
        repo: testList.repo,
        description: 'test_description',
        starCount: 99,
        tags: ['test_tag'],
      })

      expect(updateListResponse.ok()).toBe(false)
    })
  })
})

test.describe(updateListApiConfig.name, () => {
  test.describe('given signed in as admin and list is approved', () => {
    const testList = testListFinder.any(({ isApproved }) => isApproved)

    withAuth(testUserFinder.any(({ hasRole }) => hasRole('ADMIN')))

    test('should return correct list', async ({ request }) => {
      const updateListResponse = await updateList(request, {
        owner: testList.owner,
        repo: testList.repo,
        description: 'test_description',
        starCount: 99,
        tags: ['test_tag'],
      })
      const list = await updateListResponse.json()

      assertList(
        list,
        createExpectedList(testList, {
          description: 'test_description',
          starCount: 99,
          tags: ['test_tag'],
          isApproved: true,
        }),
      )
    })
  })
})

test.describe(updateListApiConfig.name, () => {
  test.describe('given signed in but no role', () => {
    const testList = testListFinder.any(({ isApproved, not }) => not(isApproved))

    withAuth(testUserFinder.any(({ hasNoRole }) => hasNoRole))

    test('should return error', async ({ request }) => {
      const updateListResponse = await updateList(request, {
        owner: testList.owner,
        repo: testList.repo,
        description: 'test_description',
        starCount: 99,
        tags: ['test_tag'],
      })

      expect(updateListResponse.ok()).toBe(false)
    })
  })
})

test.describe(findListByKeyApiConfig.name, () => {
  test.describe('given valid key', () => {
    const testList = testListFinder.any()

    test('should return correct list', async ({ request }) => {
      const findListByKeyResponse = await findListByKey(request, {
        owner: testList.owner,
        repo: testList.repo,
      })
      const list = await findListByKeyResponse.json()

      assertList(list, createExpectedList(testList))
    })
  })
})

test.describe(findListByKeyApiConfig.name, () => {
  test.describe('given invalid key', () => {
    test('should return error', async ({ request }) => {
      const findListByKeyResponse = await findListByKey(request, {
        owner: 'unknown_owner',
        repo: 'unknown_repo',
      })

      expect(findListByKeyResponse.ok()).toBe(false)
    })
  })
})
