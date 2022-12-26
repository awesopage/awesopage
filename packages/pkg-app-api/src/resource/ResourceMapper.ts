import { mapValueToString } from 'pkg-app-api/src/common/MapperUtils'
import type { ResourceWithLinks } from 'pkg-app-service/src/resource/ResourceService'
import type { ResourceDTO, ResourceLinkDTO } from 'pkg-app-shared/src/resource/ResourceDTO'

export const mapResourceToDTO = (resource: ResourceWithLinks): ResourceDTO => {
  const { id, domain, type, url, links } = resource

  return {
    id: mapValueToString(id),
    url,
    domain,
    type,
    links: links.map((link): ResourceLinkDTO => {
      const { list, description, tags } = link

      return { listOwner: list.owner, listRepo: list.repo, description, tags }
    }),
  }
}
