import type { User } from 'pkg-app-model/client'
import { AuthData, recoverSignerAddress } from 'pkg-app-service/src/auth/AuthDataSigner'
import { prismaClient } from 'pkg-app-service/src/common/PrismaClient'
import { findOrCreateUser, findUserByEmail } from 'pkg-app-service/src/user/UserService'
import { assertDefined } from 'pkg-lib-common/src/AssertUtils'

export const manageProcessAuthData = async (authData: AuthData, signature: string): Promise<User> => {
  assertDefined(process.env.AUTH_SIGNER_ADDRESS, 'AUTH_SIGNER_ADDRESS')

  if (Math.abs(+authData.timestamp - Date.now()) > 60_000) {
    throw new Error('Authentication timestamp is invalid')
  }

  const signerAddress = recoverSignerAddress(authData, signature)

  if (signerAddress !== process.env.AUTH_SIGNER_ADDRESS) {
    throw new Error('Authentication signature is invalid')
  }

  const user = await prismaClient.$transaction((dbClient) => {
    return findOrCreateUser(dbClient, {
      email: authData.email,
      displayName: authData.displayName || authData.email.split('@')[0]?.toLowerCase() || authData.email,
    })
  })

  return user
}

export const manageFindAuthUser = async (email: string): Promise<User> => {
  const user = await prismaClient.$transaction((dbClient) => {
    return findUserByEmail(dbClient, email)
  })

  return user
}
