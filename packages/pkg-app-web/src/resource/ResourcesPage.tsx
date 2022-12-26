import type { NextPage } from 'next'

import type { ResourcesPageProps } from 'pkg-app-shared/src/resource/ResourcesPageProps'
import { DefaultPageLayout } from 'pkg-app-web/src/page/DefaultPageLayout'
import { ResourceCard } from 'pkg-app-web/src/resource/ResourceCard'
import { Stack } from 'pkg-lib-ui/src/layout/Stack'

export const ResourcesPage: NextPage<ResourcesPageProps> = ({ resources }) => {
  return (
    <DefaultPageLayout>
      <Stack>
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </Stack>
    </DefaultPageLayout>
  )
}
