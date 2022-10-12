import { NextPage } from 'next'

import { ListsPageProps } from 'pkg-app-shared/src/list/ListsPageProps'
import { DefaultPageLayout } from 'pkg-app-web/src/page/DefaultPageLayout'
import { Text } from 'pkg-lib-ui/src/content/Text'
import { Box } from 'pkg-lib-ui/src/layout/Box'
import { Stack } from 'pkg-lib-ui/src/layout/Stack'

export const ListsPage: NextPage<ListsPageProps> = ({ lists }) => {
  return (
    <DefaultPageLayout>
      <Stack>
        {lists.map((list) => (
          <Box key={list.id}>
            <Text>
              {list.repoKey} - {list.description} - {list.starCount} - {list.tags.join(', ')}
            </Text>
          </Box>
        ))}
      </Stack>
    </DefaultPageLayout>
  )
}
