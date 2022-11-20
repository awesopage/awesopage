import { GetStaticProps } from 'next'

import { mapListToDTO } from 'pkg-app-api/src/list/ListMapper'
import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { findActiveLists } from 'pkg-app-service/src/list/ListService'
import { ListsPageProps } from 'pkg-app-shared/src/list/ListsPageProps'

export const getListsPageStaticProps: GetStaticProps<ListsPageProps> = async () => {
  const lists = await findActiveLists(prismaClient)

  return {
    props: {
      lists: lists.map((list) => mapListToDTO(list)),
    },
  }
}
