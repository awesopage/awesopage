import fastSort from 'fast-sort'

import type { ResourceDTO } from 'pkg-app-shared/src/resource/ResourceDTO'
import { findResourcesApiConfig } from 'pkg-app-shared/src/resource/ResourcesApiConfig'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { testResourceFinder } from 'tests/data/TestResourceData'

const findResourceDetails = createTestApiRequest(findResourcesApiConfig)

test.describe(findResourcesApiConfig.name, () => {
  const testResources = testResourceFinder.all()
  fastSort.inPlaceSort(testResources).asc(['url'])

  test('should return correct lists', async ({ request }) => {
    const findResourcesResponse = await findResourceDetails(request)
    const resources = await findResourcesResponse.json()
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
