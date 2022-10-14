export interface DevSignedAuthDataDTO {
  readonly email: string
  readonly displayName?: string
  readonly returnPath?: string
  readonly timestamp: string
  readonly signature: string
}
