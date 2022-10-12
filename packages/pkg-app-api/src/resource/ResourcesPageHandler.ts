import { GetStaticProps } from 'next'

import { getDemoResources } from 'pkg-app-api/src/resource/__t/DemoResourceData'
import { ResourcesPageProps } from 'pkg-app-shared/src/resource/ResourcesPageProps'

export const getResourcesPageStaticProps: GetStaticProps<ResourcesPageProps> = () => {
  return {
    props: {
      resources: getDemoResources(),
    },
  }
}
