import { NextPage } from 'next'

import { ListsPageProps } from 'pkg-app-shared/src/list/ListsPageProps'
import { ListCard } from 'pkg-app-web/src/list/ListCard'
import { DefaultPageLayout } from 'pkg-app-web/src/page/DefaultPageLayout'
import { Stack } from 'pkg-lib-ui/src/layout/Stack'

export const ListsPage: NextPage<ListsPageProps> = ({ lists }) => {
  return (
    <DefaultPageLayout>
      <Stack>
        {lists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </Stack>
    </DefaultPageLayout>
  )
}
