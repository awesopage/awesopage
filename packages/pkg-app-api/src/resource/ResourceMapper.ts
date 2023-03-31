import { mapTimestampToString, mapValueToString } from 'pkg-app-api/src/common/MapperUtils'
import type { ResourceDetails } from 'pkg-app-api/src/resource/ResourceService'
import type { ResourceDTO, ResourceLinkDTO } from 'pkg-app-shared/src/resource/ResourceDTO'

export const mapResourceDetailsToDTO = (resourceDetails: ResourceDetails): ResourceDTO => {
  const { id, domain, type, url, createdAt, links } = resourceDetails

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
