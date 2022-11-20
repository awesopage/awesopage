import { NextPage } from 'next'

import { ListsPageProps } from 'pkg-app-shared/src/list/ListsPageProps'
import { ListCard } from 'pkg-app-web/src/list/ListCard'
import { DefaultPageLayout } from 'pkg-app-web/src/page/DefaultPageLayout'
import { Grid } from 'pkg-lib-ui/src/layout/Grid'

export const ListsPage: NextPage<ListsPageProps> = ({ lists }) => {
  return (
    <DefaultPageLayout>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}>
        {lists.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
      </Grid>
    </DefaultPageLayout>
  )
}
