import { likeListApiConfig, unlikeListApiConfig } from 'pkg-app-shared/src/list/ListLikesApiConfig'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { testListFinder } from 'tests/data/TestListData'
import { testUserFinder, withAuth } from 'tests/data/TestUserData'

const likeList = createTestApiRequest(likeListApiConfig)
const unlikeList = createTestApiRequest(unlikeListApiConfig)

test.describe(likeListApiConfig.name, () => {
  test.describe('given signed in', () => {
    const testList = testListFinder.any()

    withAuth(testUserFinder.any())

    test('should receive correct list like', async ({ request }) => {
      const likeListResponse = await likeList(request, { owner: testList.owner, repo: testList.repo })

      expect(likeListResponse.ok()).toBe(true)
    })
  })

  test.describe('given not signed in', () => {
    const testList = testListFinder.any()

    test('should receive error', async ({ request }) => {
      const likeListResponse = await likeList(request, { owner: testList.owner, repo: testList.repo })

      expect(likeListResponse.ok()).toBe(false)
    })
  })
})

test.describe(unlikeListApiConfig.name, () => {
  test.describe('given signed in', () => {
    const testList = testListFinder.any()

    withAuth(testUserFinder.any())

    test('should receive correct list unlike', async ({ request }) => {
      const unlikeListResponse = await unlikeList(request, { owner: testList.owner, repo: testList.repo })

      expect(unlikeListResponse.ok()).toBe(true)
    })
  })

  test.describe('given not signed in', () => {
    const testList = testListFinder.any()

    test('should receive error', async ({ request }) => {
      const likeListResponse = await likeList(request, { owner: testList.owner, repo: testList.repo })

      expect(likeListResponse.ok()).toBe(false)
    })
  })
})
