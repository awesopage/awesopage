import { hash, recover, sign } from 'eth-crypto'

export interface AuthData {
  readonly email: string
  readonly displayName?: string
  readonly returnPath?: string
  readonly timestamp: string
}

export const signAuthData = (authData: AuthData, signerPrivateKey: string): string => {
  const messageHash = getMessageHash(authData)

  return sign(signerPrivateKey, messageHash)
}

export const recoverSignerAddress = (authData: AuthData, signature: string): string => {
  const messageHash = getMessageHash(authData)

  return recover(signature, messageHash)
}

const getMessageHash = (authData: AuthData): string => {
  return hash.keccak256([authData.email, authData.displayName, authData.returnPath, authData.timestamp].join('&'))
}
