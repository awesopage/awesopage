import parseUrl from 'parse-url'

import type { DbClient } from 'pkg-app-api/src/common/DbClient'
import type { List, Resource, ResourceLink, ResourceTypeEnum } from 'pkg-app-model/client'

export type CreateResourceOptions = Readonly<{
  url: string
  type: ResourceTypeEnum
}>

export const createOrUpdateResource = async (dbClient: DbClient, options: CreateResourceOptions): Promise<Resource> => {
  const { url, type } = options

  const { resource: domain } = parseUrl(url)
  const now = new Date()

  const resource = await dbClient.resource.upsert({
    where: {
      url,
    },
    update: {
      domain,
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

export type LinkResourceOptions = Readonly<{
  resource: Resource
  list: List
  description: string
  tags: string[]
}>

export const linkResource = async (dbClient: DbClient, options: LinkResourceOptions): Promise<ResourceLink> => {
  const { resource, list, description, tags } = options

  const resourceLink = await dbClient.resourceLink.upsert({
    where: {
      resourceId_listId: {
        resourceId: resource.id,
        listId: list.id,
      },
    },
    create: {
      resourceId: resource.id,
      listId: list.id,
      description,
      tags,
    },
    update: {
      description,
      tags,
    },
  })

  return resourceLink
}

export type ResourceLinkDetails = ResourceLink &
  Readonly<{
    list: List
  }>

export type ResourceDetails = Resource &
  Readonly<{
    links: ResourceLinkDetails[]
  }>

export const findResourceDetails = async (dbClient: DbClient): Promise<ResourceDetails[]> => {
  const resourceDetails = await dbClient.resource.findMany({
    include: {
      links: {
        include: {
          list: true,
        },
      },
    },
  })

  return resourceDetails
}

export const findResourceDetailsById = async (dbClient: DbClient, resourceId: bigint): Promise<ResourceDetails> => {
  const resourceDetails = await dbClient.resource.findUniqueOrThrow({
    where: { id: resourceId },
    include: {
      links: {
        include: {
          list: true,
        },
      },
    },
  })

  return resourceDetails
}

export const findResourceDetailsByList = async (dbClient: DbClient, list: List): Promise<ResourceDetails[]> => {
  const resourceDetails = await dbClient.resource.findMany({
    where: {
      links: {
        some: {
          listId: list.id,
        },
      },
    },
    include: {
      links: {
        include: {
          list: true,
        },
      },
    },
  })

  return resourceDetails
}
