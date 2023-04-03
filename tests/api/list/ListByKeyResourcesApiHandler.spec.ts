import fastSort from 'fast-sort'

import { assertDefined } from 'pkg-app-shared/src/common/AssertUtils'
import { getResourcesByListKeyApiConfig } from 'pkg-app-shared/src/list/ListByKeyResourcesApiConfig'
import type { ResourceDTO } from 'pkg-app-shared/src/resource/ResourceDTO'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { testListFinder } from 'tests/data/TestListData'
import { testResourceFinder } from 'tests/data/TestResourceData'

const getResourcesByListKey = createTestApiRequest(getResourcesByListKeyApiConfig)

test.describe(getResourcesByListKeyApiConfig.name, () => {
  test.describe('given valid key', () => {
    const testActiveLists = testListFinder.all(({ hasStatus }) => hasStatus('ACTIVE'))
    const testList = testActiveLists.find(
      (testActiveList) =>
        !!testResourceFinder.any(({ hasLinkToList }) => hasLinkToList(testActiveList.owner, testActiveList.repo)),
    )

    assertDefined(testList, 'testList')

    const testResources = testResourceFinder.all(({ hasLinkToList }) => hasLinkToList(testList.owner, testList.repo))
    fastSort.inPlaceSort(testResources).asc(['url'])

    test('should return correct resources', async ({ request }) => {
      const getResourcesByListKeyResponse = await getResourcesByListKey(request, {
        owner: testList.owner,
        repo: testList.repo,
      })
      const resources = await getResourcesByListKeyResponse.json()
      fastSort.inPlaceSort(resources).asc(['url'])

      const expectedResources = testResources.map(
        (testResource): Partial<ResourceDTO> => ({
          url: testResource.url,
          type: testResource.type,
          links: testResource.links,
        }),
      )

      expect(resources.length).toBe(expectedResources.length)

      resources.forEach((resource, index) => {
        expect(resource).toMatchObject(expectedResources[index] ?? {})
      })
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

      expect(getResourcesByListKeyResponse.ok()).toBe(false)
    })
  })
})
