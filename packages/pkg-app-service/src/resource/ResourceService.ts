import parseUrl from 'parse-url'

import { Resource, ResourceLink, ResourceTypeEnum } from 'pkg-app-model/client'
import { DbClient } from 'pkg-app-model/src/common/DbClient'

export interface CreateOrFindResourceOption {
  readonly url: string
  readonly type: ResourceTypeEnum
}

export const createOrFindResource = async (
  dbClient: DbClient,
  options: CreateOrFindResourceOption,
): Promise<Resource> => {
  const { url, type } = options

  const domain = parseUrl(url).resource
  const now = new Date()

  const resource = await dbClient.resource.upsert({
    where: {
      url,
    },
    update: {},
    create: {
      url,
      domain,
      type,
      createdAt: now,
      updatedAt: now,
    },
  })

  return resource
}

export interface LinkResourceOption {
  readonly resource: Resource
  readonly listRepoKey: string
  readonly description: string
  readonly tags: string[]
}

export const linkResource = async (dbClient: DbClient, options: LinkResourceOption): Promise<ResourceLink> => {
  const { resource, listRepoKey, description, tags } = options

  const resourceLink = await dbClient.resourceLink.create({
    data: {
      description,
      tags,
      resource: {
        connect: { id: resource.id },
      },
      list: {
        connect: { repoKey: listRepoKey },
      },
    },
  })

  return resourceLink
}
