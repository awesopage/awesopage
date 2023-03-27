import { mapTimestampToString, mapValueToString } from 'pkg-app-api/src/common/MapperUtils'
import type { ResourceWithLinks } from 'pkg-app-api/src/resource/ResourceService'
import type { ResourceDTO, ResourceLinkDTO } from 'pkg-app-shared/src/resource/ResourceDTO'

export const mapResourceToDTO = (resource: ResourceWithLinks): ResourceDTO => {
  const { id, domain, type, url, createdAt, links } = resource

  return {
    id: mapValueToString(id),
    domain,
    type,
    url,
    createdAt: mapTimestampToString(createdAt),
    links: links.map((link): ResourceLinkDTO => {
      const { list, description, tags } = link

      return { listOwner: list.owner, listRepo: list.repo, description, tags }
    }),
  }
}
