export type ResourceType = 'CODE' | 'VIDEO' | 'WEBSITE'

export interface ResourceDTO {
  readonly id: string
  readonly url: string
  readonly domain: string
  readonly type: ResourceType
  readonly links: ResourceLinkDTO[]
}

export interface ResourceLinkDTO {
  readonly listOwner: string
  readonly listRepo: string
  readonly description: string
  readonly tags: string[]
}
