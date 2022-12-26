import parseUrl from 'parse-url'

import type { List, Resource, ResourceLink, ResourceTypeEnum } from 'pkg-app-model/client'
import type { DbClient } from 'pkg-app-model/src/common/DbClient'

export interface CreateOrUpdateResourceOptions {
  readonly url: string
  readonly type: ResourceTypeEnum
}

export const createOrUpdateResource = async (
  dbClient: DbClient,
  options: CreateOrUpdateResourceOptions,
): Promise<Resource> => {
  const { url, type } = options

  const { resource: domain } = parseUrl(url)
  const now = new Date()

  const resource = await dbClient.resource.upsert({
    where: {
      url,
    },
    update: {
      type,
      updatedAt: now,
    },
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

export interface LinkResourceOptions {
  readonly resource: Resource
  readonly list: List
  readonly description: string
  readonly tags: string[]
}

export const linkResource = async (dbClient: DbClient, options: LinkResourceOptions): Promise<ResourceLink> => {
  const { resource, list, description, tags } = options

  const resourceLink = await dbClient.resourceLink.create({
    data: {
      description,
      tags,
      resourceId: resource.id,
      listId: list.id,
    },
  })

  return resourceLink
}

export interface ResourceLinkWithList extends ResourceLink {
  readonly list: List
}

export interface ResourceWithLinks extends Resource {
  readonly links: ResourceLinkWithList[]
}

export const findResources = async (dbClient: DbClient): Promise<ResourceWithLinks[]> => {
  const resources = await dbClient.resource.findMany({
    include: {
      links: {
        include: {
          list: true,
        },
      },
    },
  })

  return resources
}
