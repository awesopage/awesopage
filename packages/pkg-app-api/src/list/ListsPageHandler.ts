import { GetStaticProps } from 'next'

import { getDemoLists } from 'pkg-app-api/src/list/__t/DemoListData'
import { ListsPageProps } from 'pkg-app-shared/src/list/ListsPageProps'

export const getListsPageStaticProps: GetStaticProps<ListsPageProps> = () => {
  return {
    props: {
      lists: getDemoLists(),
    },
  }
}
