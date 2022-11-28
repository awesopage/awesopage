import { mapValueToString } from 'pkg-app-api/src/common/MapperUtils'
import { ResourceWithLinks } from 'pkg-app-service/src/resource/ResourceService'
import { ResourceDTO } from 'pkg-app-shared/src/resource/ResourceDTO'

export const mapResourceToDTO = (resource: ResourceWithLinks): ResourceDTO => {
  const { id, domain, type, url, links } = resource

  return {
    id: mapValueToString(id),
    url,
    domain,
    type,
    links: links.map((link) => ({ listRepoKey: link.list.repoKey, description: link.description, tags: link.tags })),
  }
}
