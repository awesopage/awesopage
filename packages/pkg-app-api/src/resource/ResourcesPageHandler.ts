import { GetStaticProps } from 'next'

import { createDemoResources } from 'pkg-app-api/src/resource/__dev/DemoResourceData'
import { ResourcesPageProps } from 'pkg-app-shared/src/resource/ResourcesPageProps'

export const getResourcesPageStaticProps: GetStaticProps<ResourcesPageProps> = () => {
  return {
    props: {
      resources: createDemoResources(),
    },
  }
}
