export type ResourceType = 'CODE' | 'VIDEO' | 'WEBSITE'

export type ResourceDTO = Readonly<{
  id: string
  domain: string
  type: ResourceType
  url: string
  createdAt: string
  links: ResourceLinkDTO[]
}>

export type ResourceLinkDTO = Readonly<{
  listOwner: string
  listRepo: string
  description: string
  tags: string[]
}>
