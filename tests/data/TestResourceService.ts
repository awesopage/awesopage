import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { findListByKey } from 'pkg-app-api/src/list/ListService'
import { createOrUpdateResource, linkResource } from 'pkg-app-api/src/resource/ResourceService'
import { testLists } from 'tests/data/TestListData'
import { testResources } from 'tests/data/TestResourceData'

export const createTestResources = async () => {
  await prismaClient.$transaction(async (dbClient) => {
    for (const testList of testLists) {
      const list = await findListByKey(dbClient, { owner: testList.owner, repo: testList.repo })

      const testResourcesOfList = testResources.map((testResource) => {
        return {
          testResource,
          linkOfList: testResource.links.find(
            (link) => link.listOwner === testList.owner && link.listRepo === testList.repo,
          ),
        }
      })

      for (const { testResource, linkOfList } of testResourcesOfList) {
        if (!linkOfList) {
          continue
        }

        const { url, type } = testResource

        const resource = await createOrUpdateResource(dbClient, { url, type })

        const { description, tags } = linkOfList

        await linkResource(dbClient, { resource, list, description, tags })
      }
    }
  })
}
