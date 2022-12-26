import type { GetStaticProps } from 'next'

import { mapResourceToDTO } from 'pkg-app-api/src/resource/ResourceMapper'
import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { findResources } from 'pkg-app-service/src/resource/ResourceService'
import type { ResourcesPageProps } from 'pkg-app-shared/src/resource/ResourcesPageProps'

export const getResourcesPageStaticProps: GetStaticProps<ResourcesPageProps> = async () => {
  const resources = await findResources(prismaClient)

  return {
    props: {
      resources: resources.map((resource) => mapResourceToDTO(resource)),
    },
  }
}
