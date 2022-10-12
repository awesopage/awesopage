import * as fake from 'fictional'

import { getDemoLists } from 'pkg-app-api/src/list/__t/DemoListData'
import { ResourceDTO, ResourceLinkDTO, ResourceType } from 'pkg-app-shared/src/resource/ResourceDTO'
import { getRange } from 'pkg-lib-common/src/CollectionUtils'

export const getDemoResources = (): ResourceDTO[] => {
  const listRepoKeys = getDemoLists().map(({ repoKey }) => repoKey)
  const domains = ['github.com', 'youtube.com', 'medium.com']
  const tags: string[] = getRange(1, 20).map((topicIndex) => `tag${topicIndex}`)

  return getRange(1, 180).map((resourceIndex): ResourceDTO => {
    return fake.shape(resourceIndex, {
      id: `${resourceIndex}`,
      url: fake.join('', [
        'https://',
        fake.word.options({ capitalize: false, unicode: false }),
        '.com/',
        fake.word.options({ capitalize: false, unicode: false }),
      ]),
      domain: fake.oneOf(domains),
      type: fake.oneOf<ResourceType>(['CODE', 'VIDEO', 'DEFAULT']),
      links: (linkInput: fake.Input) => {
        return fake.someOf(linkInput, [1, 3], listRepoKeys).map((listRepoKey): ResourceLinkDTO => {
          return fake.shape(listRepoKey, {
            listRepoKey,
            description: fake.sentence.options({ unicode: false }),
            tags: fake.someOf([1, 3], tags),
          })
        })
      },
    })
  })
}
