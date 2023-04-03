import { assertDefined } from 'pkg-app-shared/src/common/AssertUtils'
import { findResourceByIdApiConfig } from 'pkg-app-shared/src/resource/ResourceByIdApiConfig'
import type { ResourceDTO } from 'pkg-app-shared/src/resource/ResourceDTO'
import { findResourcesApiConfig } from 'pkg-app-shared/src/resource/ResourcesApiConfig'
import { createTestApiRequest, expect, test } from 'tests/common/TestUtils'
import { testResourceFinder } from 'tests/data/TestResourceData'

const findResourceById = createTestApiRequest(findResourceByIdApiConfig)
const findResources = createTestApiRequest(findResourcesApiConfig)

test.describe(findResourceByIdApiConfig.name, () => {
  test.describe('given valid resource id', () => {
    const testResource = testResourceFinder.any()

    test('should return correct resources', async ({ request }) => {
      const findResourcesResponse = await findResources(request)
      const resources = await findResourcesResponse.json()
      const foundResource = resources.find((resource) => resource.url === testResource.url)
      assertDefined(foundResource, 'foundResource')

      const findResourceByIdResponse = await findResourceById(request, foundResource.id)
      const resource = await findResourceByIdResponse.json()

      const expectedResource: Partial<ResourceDTO> = {
        url: testResource.url,
        type: testResource.type,
        links: testResource.links,
      }

      expect(resource).toMatchObject(expectedResource)
    })
  })
})

test.describe(findResourceByIdApiConfig.name, () => {
  test.describe('given invalid id', () => {
    test('should return error', async ({ request }) => {
      const findResourceByIdResponse = await findResourceById(request, '-1')

      expect(findResourceByIdResponse.ok()).toBe(false)
    })
  })
})
