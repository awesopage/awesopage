import { NextPage } from 'next'

import { ResourcesPageProps } from 'pkg-app-shared/src/resource/ResourcesPageProps'
import { DefaultPageLayout } from 'pkg-app-web/src/page/DefaultPageLayout'
import { ResourceCard } from 'pkg-app-web/src/resource/ResourceCard'
import { Grid } from 'pkg-lib-ui/src/layout/Grid'

export const ResourcesPage: NextPage<ResourcesPageProps> = ({ resources }) => {
  return (
    <DefaultPageLayout>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </Grid>
    </DefaultPageLayout>
  )
}
