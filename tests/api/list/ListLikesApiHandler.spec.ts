import type { ListDTO } from 'pkg-app-shared/src/list/ListDTO'
import { likeListApiConfig, unlikeListApiConfig } from 'pkg-app-shared/src/list/ListLikesApiConfig'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { testListLikeFinder } from 'tests/data/TestListLikeData'
import { testUserFinder, withAuth } from 'tests/data/TestUserData'

const likeList = createTestApiRequest(likeListApiConfig)
const unlikeList = createTestApiRequest(unlikeListApiConfig)

test.describe(likeListApiConfig.name, () => {
  test.describe('given signed in and list is not liked yet', () => {
    const user = testUserFinder.any(({ hasNoRole }) => hasNoRole)

    const testListLike = testListLikeFinder.any(({ isLikedBy, not }) => not(isLikedBy(user.email)))

    withAuth(user)

    test('should return correct list', async ({ request }) => {
      const likeListResponse = await likeList(request, { owner: testListLike.owner, repo: testListLike.repo })

      const list = await likeListResponse.json()

      const expectedList: Partial<ListDTO> = {
        owner: testListLike.owner,
        repo: testListLike.repo,
        likeCount: testListLike.likedByEmails.length + 1,
      }

      expect(list).toMatchObject(expectedList)
    })
  })
})

test.describe(likeListApiConfig.name, () => {
  test.describe('given signed in and list is already liked', () => {
    const user = testUserFinder.any(({ hasNoRole }) => hasNoRole)

    const testListLike = testListLikeFinder.any(({ isLikedBy }) => isLikedBy(user.email))

    withAuth(user)

    test('should return correct list', async ({ request }) => {
      const likeListResponse = await likeList(request, { owner: testListLike.owner, repo: testListLike.repo })

      const list = await likeListResponse.json()

      const expectedList: Partial<ListDTO> = {
        owner: testListLike.owner,
        repo: testListLike.repo,
        likeCount: testListLike.likedByEmails.length,
      }

      expect(list).toMatchObject(expectedList)
    })
  })
})

test.describe(likeListApiConfig.name, () => {
  test.describe('given not signed in', () => {
    const testList = testListLikeFinder.any()

    test('should return error', async ({ request }) => {
      const likeListResponse = await likeList(request, { owner: testList.owner, repo: testList.repo })

      expect(likeListResponse.ok()).toBe(false)
    })
  })
})

test.describe(unlikeListApiConfig.name, () => {
  test.describe('given signed in and list is not liked yet', () => {
    const user = testUserFinder.any(({ hasNoRole }) => hasNoRole)

    const testListLike = testListLikeFinder.any(({ isLikedBy, not }) => not(isLikedBy(user.email)))

    withAuth(user)

    test('should return correct list', async ({ request }) => {
      const unlikeListResponse = await unlikeList(request, { owner: testListLike.owner, repo: testListLike.repo })

      const list = await unlikeListResponse.json()

      const expectedList: Partial<ListDTO> = {
        owner: testListLike.owner,
        repo: testListLike.repo,
        likeCount: testListLike.likedByEmails.length,
      }

      expect(list).toMatchObject(expectedList)
    })
  })
})

test.describe(unlikeListApiConfig.name, () => {
  test.describe('given signed in and list is already liked', () => {
    const user = testUserFinder.any(({ hasNoRole }) => hasNoRole)

    const testListLike = testListLikeFinder.any(({ isLikedBy }) => isLikedBy(user.email))

    withAuth(user)

    test('should return correct list', async ({ request }) => {
      const unlikeListResponse = await unlikeList(request, { owner: testListLike.owner, repo: testListLike.repo })

      const list = await unlikeListResponse.json()

      const expectedList: Partial<ListDTO> = {
        owner: testListLike.owner,
        repo: testListLike.repo,
        likeCount: testListLike.likedByEmails.length - 1,
      }

      expect(list).toMatchObject(expectedList)
    })
  })
})

test.describe(unlikeListApiConfig.name, () => {
  test.describe('given not signed in', () => {
    const testList = testListLikeFinder.any()

    test('should return error', async ({ request }) => {
      const unlikeListResponse = await unlikeList(request, { owner: testList.owner, repo: testList.repo })

      expect(unlikeListResponse.ok()).toBe(false)
    })
  })
})
