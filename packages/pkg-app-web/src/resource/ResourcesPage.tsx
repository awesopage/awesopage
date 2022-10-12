import { NextPage } from 'next'

import { ResourcesPageProps } from 'pkg-app-shared/src/resource/ResourcesPageProps'
import { DefaultPageLayout } from 'pkg-app-web/src/page/DefaultPageLayout'
import { Text } from 'pkg-lib-ui/src/content/Text'
import { Box } from 'pkg-lib-ui/src/layout/Box'
import { Stack } from 'pkg-lib-ui/src/layout/Stack'

export const ResourcesPage: NextPage<ResourcesPageProps> = ({ resources }) => {
  return (
    <DefaultPageLayout>
      <Stack>
        {resources.map((resource) => (
          <Box key={resource.id}>
            <Text>
              {resource.url} - {resource.domain} - {resource.type}
            </Text>
            {resource.links.map((resourceLink) => (
              <Text key={resourceLink.listRepoKey}>
                {resourceLink.listRepoKey} - {resourceLink.description} - {resourceLink.tags.join(', ')}
              </Text>
            ))}
          </Box>
        ))}
      </Stack>
    </DefaultPageLayout>
  )
}
