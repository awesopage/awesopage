import { assertDefined } from 'pkg-app-shared/src/common/AssertUtils'
import { approveListApiConfig } from 'pkg-app-shared/src/list/ListByKeyApprovalApiConfig'
import type { ListDTO } from 'pkg-app-shared/src/list/ListDTO'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { testListFinder } from 'tests/data/TestListData'
import { testUserFinder, withAuth } from 'tests/data/TestUserData'

const approveList = createTestApiRequest(approveListApiConfig)

test.describe(approveListApiConfig.name, () => {
  test.describe('given signed in as reviewer and list is unappoved and requested by different user', () => {
    const reviewers = testUserFinder.all(({ hasRole }) => hasRole('REVIEWER'))
    const { reviewer, listRequestedByDiffUser } =
      reviewers
        .map((reviewer) => {
          const listRequestedByDiffUser = testListFinder.peek(({ isRequestedBy, isApproved, and, not }) =>
            and(not(isApproved), not(isRequestedBy(reviewer.email))),
          )

          return { reviewer, listRequestedByDiffUser }
        })
        .find(({ listRequestedByDiffUser }) => !!listRequestedByDiffUser) ?? {}

    assertDefined(reviewer, 'reviewer')
    assertDefined(listRequestedByDiffUser, 'listRequestedByDiffUser')

    withAuth(reviewer)

    test('should return correct list', async ({ request }) => {
      const approveListResponse = await approveList(request, {
        owner: listRequestedByDiffUser.owner,
        repo: listRequestedByDiffUser.repo,
      })
      const list = await approveListResponse.json()

      const expectedList: Partial<ListDTO> = {
        owner: listRequestedByDiffUser.owner,
        repo: listRequestedByDiffUser.repo,
        isApproved: true,
      }

      expect(list).toMatchObject(expectedList)
      expect(list.approvedBy?.email).toBe(reviewer.email)
    })
  })
})

test.describe(approveListApiConfig.name, () => {
  test.describe('given signed in as reviewer and list is appoved and requested by different user', () => {
    const reviewers = testUserFinder.all(({ hasRole }) => hasRole('REVIEWER'))
    const { reviewer, listRequestedByDiffUser } =
      reviewers
        .map((reviewer) => {
          const listRequestedByDiffUser = testListFinder.peek(({ isRequestedBy, isApproved, and, not }) =>
            and(isApproved, not(isRequestedBy(reviewer.email))),
          )

          return { reviewer, listRequestedByDiffUser }
        })
        .find(({ listRequestedByDiffUser }) => !!listRequestedByDiffUser) ?? {}

    assertDefined(reviewer, 'reviewer')
    assertDefined(listRequestedByDiffUser, 'listRequestedByDiffUser')

    withAuth(reviewer)

    test('should return error', async ({ request }) => {
      const approveListResponse = await approveList(request, {
        owner: listRequestedByDiffUser.owner,
        repo: listRequestedByDiffUser.repo,
      })

      expect(approveListResponse.ok()).toBe(false)
    })
  })
})

test.describe(approveListApiConfig.name, () => {
  test.describe('given signed in as reviewer and list is unappoved and requested by a same user', () => {
    const reviewers = testUserFinder.all(({ hasRole }) => hasRole('REVIEWER'))
    const { reviewer, listRequestedBySameUser } =
      reviewers
        .map((reviewer) => {
          const listRequestedBySameUser = testListFinder.peek(({ isRequestedBy, isApproved, and, not }) =>
            and(not(isApproved), isRequestedBy(reviewer.email)),
          )

          return { reviewer, listRequestedBySameUser }
        })
        .find(({ listRequestedBySameUser }) => !!listRequestedBySameUser) ?? {}

    assertDefined(reviewer, 'reviewer')
    assertDefined(listRequestedBySameUser, 'listRequestedBySameUser')

    withAuth(reviewer)

    test('should return error', async ({ request }) => {
      const approveListResponse = await approveList(request, {
        owner: listRequestedBySameUser.owner,
        repo: listRequestedBySameUser.repo,
      })

      expect(approveListResponse.ok()).toBe(false)
    })
  })
})

test.describe(approveListApiConfig.name, () => {
  test.describe('given signed in but not reviewer', () => {
    const users = testUserFinder.all(({ hasRole, not }) => not(hasRole('REVIEWER')))
    const { user, listRequestedByDiffUser } =
      users
        .map((user) => {
          const listRequestedByDiffUser = testListFinder.peek(({ isRequestedBy, isApproved, and, not }) =>
            and(not(isApproved), not(isRequestedBy(user.email))),
          )

          return { user, listRequestedByDiffUser }
        })
        .find(({ listRequestedByDiffUser }) => !!listRequestedByDiffUser) ?? {}

    assertDefined(user, 'user')
    assertDefined(listRequestedByDiffUser, 'listRequestedByDiffUser')

    withAuth(user)

    test('should return error', async ({ request }) => {
      const approveListResponse = await approveList(request, {
        owner: listRequestedByDiffUser.owner,
        repo: listRequestedByDiffUser.repo,
      })

      expect(approveListResponse.ok()).toBe(false)
    })
  })
})
