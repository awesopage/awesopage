import { setListStatusApiConfig } from 'pkg-app-shared/src/list/ListByKeyStatusApiConfig'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { assertList, createExpectedList, testListFinder } from 'tests/data/TestListData'
import { testUserFinder, withAuth } from 'tests/data/TestUserData'

const setListStatus = createTestApiRequest(setListStatusApiConfig)

test.describe(setListStatusApiConfig.name, () => {
  test.describe('given signed in as admin and status is ACTIVE and list is inactive and approved', () => {
    const testList = testListFinder.any(({ hasStatus, isApproved, and }) => and(hasStatus('INACTIVE'), isApproved))

    withAuth(testUserFinder.any(({ hasRole }) => hasRole('ADMIN')))

    test('should return correct list', async ({ request }) => {
      const setListStatusResponse = await setListStatus(request, {
        owner: testList.owner,
        repo: testList.repo,
        status: 'ACTIVE',
      })
      const list = await setListStatusResponse.json()

      assertList(
        list,
        createExpectedList(testList, {
          status: 'ACTIVE',
          isApproved: true,
        }),
      )
    })
  })
})

test.describe(setListStatusApiConfig.name, () => {
  test.describe('given signed in as admin and status is ACTIVE and list is inactive and unapproved', () => {
    const testList = testListFinder.any(({ hasStatus, isApproved, and, not }) =>
      and(hasStatus('INACTIVE'), not(isApproved)),
    )

    withAuth(testUserFinder.any(({ hasRole }) => hasRole('ADMIN')))

    test('should return error', async ({ request }) => {
      const setListStatusResponse = await setListStatus(request, {
        owner: testList.owner,
        repo: testList.repo,
        status: 'ACTIVE',
      })

      expect(setListStatusResponse.ok()).toBe(false)
    })
  })
})

test.describe(setListStatusApiConfig.name, () => {
  test.describe('given signed in as admin and status is INACTIVE and list is active and approved', () => {
    const testList = testListFinder.any(({ hasStatus, isApproved, and }) => and(hasStatus('ACTIVE'), isApproved))

    withAuth(testUserFinder.any(({ hasRole }) => hasRole('ADMIN')))

    test('should return correct list', async ({ request }) => {
      const setListStatusResponse = await setListStatus(request, {
        owner: testList.owner,
        repo: testList.repo,
        status: 'INACTIVE',
      })
      const list = await setListStatusResponse.json()

      assertList(
        list,
        createExpectedList(testList, {
          status: 'INACTIVE',
          isApproved: true,
        }),
      )
    })
  })
})

test.describe(setListStatusApiConfig.name, () => {
  test.describe('given signed in but not admin', () => {
    const testList = testListFinder.any(({ hasStatus, isApproved, and }) => and(hasStatus('INACTIVE'), isApproved))

    withAuth(testUserFinder.any(({ hasRole, not }) => not(hasRole('ADMIN'))))

    test('should return error', async ({ request }) => {
      const setListStatusResponse = await setListStatus(request, {
        owner: testList.owner,
        repo: testList.repo,
        status: 'ACTIVE',
      })

      expect(setListStatusResponse.ok()).toBe(false)
    })
  })
})
