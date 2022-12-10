export interface ListDTO {
  readonly id: string
  readonly owner: string
  readonly repo: string
  readonly description: string
  readonly starCount: number
  readonly tags: string[]
}
