import * as fake from 'fictional'

import { ListDTO } from 'pkg-app-shared/src/list/ListDTO'
import { getRange } from 'pkg-lib-common/src/CollectionUtils'

export const getDemoLists = (): ListDTO[] => {
  const owners: string[] = getRange(1, 5).map((ownerIndex) => `owner${ownerIndex}`)
  const topics: string[] = getRange(1, 10).map((topicIndex) => `topic${topicIndex}`)

  return getRange(1, 60).map((listIndex): ListDTO => {
    return fake.shape(listIndex, {
      id: `${listIndex}`,
      repoKey: fake.join('/', [fake.oneOf(owners), `repo${listIndex}`]),
      description: fake.sentence.options({ unicode: false }),
      starCount: fake.int.options({ min: 1_000, max: 10_000 }),
      tags: fake.someOf([2, 4], topics),
    })
  })
}
