import { getResourcesByListKeyApiConfig } from 'pkg-app-shared/src/list/ListByKeyResourcesApiConfig'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { testListFinder } from 'tests/data/TestListData'
import { testResourceFinder } from 'tests/data/TestResourceData'

const getResourcesByListKey = createTestApiRequest(getResourcesByListKeyApiConfig)

test.describe(getResourcesByListKeyApiConfig.name, () => {
  test.describe('given valid key', () => {
    const testActiveLists = testListFinder.all(({ hasStatus }) => hasStatus('ACTIVE'))
    const testList = testActiveLists.find(
      (testActiveList) =>
        !!testResourceFinder.any(({ hasListKey }) => hasListKey(testActiveList.owner, testActiveList.repo)),
    )

    test('should return correct resources', async ({ request }) => {
      expect(testList).toBeTruthy()
      const owner = testList?.owner || ''
      const repo = testList?.repo || ''

      const getResourcesByListKeyResponse = await getResourcesByListKey(request, { owner, repo })
      const resources = await getResourcesByListKeyResponse.json()

      const expectedResources = testResourceFinder.all(({ hasListKey }) => hasListKey(owner, repo))

      expect(resources.length).toBe(expectedResources.length)

      expect(resources).toMatchObject(expectedResources)
    })
  })
})

test.describe(getResourcesByListKeyApiConfig.name, () => {
  test.describe('given invalid key', () => {
    test('should return error', async ({ request }) => {
      const getResourcesByListKeyResponse = await getResourcesByListKey(request, {
        owner: 'unknown_owner',
        repo: 'unknown_repo',
      })

      const resources = await getResourcesByListKeyResponse.json()

      expect(resources.length).toBe(0)
    })
  })
})
