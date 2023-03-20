import { prismaClient } from 'pkg-app-api/src/common/DbClient'
import { findOrCreateListLike } from 'pkg-app-api/src/list/ListLikeService'
import { findListByKey } from 'pkg-app-api/src/list/ListService'
import { findUserByEmail } from 'pkg-app-api/src/user/UserService'
import { testListLikes } from 'tests/data/TestListLikeData'

export const createTestListLikes = async () => {
  await prismaClient.$transaction(async (dbClient) => {
    for (const testListLike of testListLikes) {
      const { owner, repo, likeEmails } = testListLike

      const list = await findListByKey(dbClient, { owner, repo })

      for (const likeEmail of likeEmails) {
        const user = await findUserByEmail(dbClient, likeEmail)

        await findOrCreateListLike(dbClient, { list, user })
      }
    }
  })
}
