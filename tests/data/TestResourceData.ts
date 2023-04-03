import type { ResourceTypeEnum } from 'pkg-app-model/client'
import type { Predicate } from 'tests/data/TestDataFinder'
import { createTestDataFinder } from 'tests/data/TestDataFinder'

export type TestResourceLink = Readonly<{
  listOwner: string
  listRepo: string
  description: string
  tags: string[]
}>

export type TestResource = Readonly<{
  url: string
  type: ResourceTypeEnum
  links: TestResourceLink[]
}>

type TestListSection = Readonly<{
  tag: string
  subSections?: TestListSection[]
  links?: Readonly<{
    url: string
    type: ResourceTypeEnum
    description: string
  }>[]
}>

type TestListContent = Readonly<{
  owner: string
  repo: string
  sections: TestListSection[]
}>

const testListContents: TestListContent[] = [
  {
    owner: 'owner1',
    repo: 'repo1',
    sections: [
      {
        tag: 'section1',
        subSections: [
          {
            tag: 'section1-1',
            links: [
              {
                url: 'https://example.com/code1',
                type: 'CODE',
                description: 'Code 1 is good',
              },
              {
                url: 'https://example.com/website3',
                type: 'WEBSITE',
                description: 'Website 3 is great',
              },
            ],
          },
          {
            tag: 'section1-2',
            links: [
              {
                url: 'https://example.com/video5',
                type: 'VIDEO',
                description: 'Video 5 is fantastic',
              },
            ],
          },
        ],
      },
      {
        tag: 'section2',
        subSections: [
          {
            tag: 'section2-1',
            links: [
              {
                url: 'https://example.com/code4',
                type: 'CODE',
                description: 'Checkout code 4',
              },
            ],
          },
          {
            tag: 'section2-2',
            links: [
              {
                url: 'https://example.com/website6',
                type: 'WEBSITE',
                description: 'Website 6 is interesting',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    owner: 'owner1',
    repo: 'repo2',
    sections: [
      {
        tag: 'section1',
        subSections: [
          {
            tag: 'section1-1',
            links: [
              {
                url: 'https://example.com/video2',
                type: 'VIDEO',
                description: 'Video 2 is nice',
              },
            ],
          },
          {
            tag: 'section1-2',
            links: [
              {
                url: 'https://example.com/code1',
                type: 'CODE',
                description: 'Code 1 is cool',
              },
              {
                url: 'https://example.com/video5',
                type: 'VIDEO',
                description: 'Video 5 is helpful',
              },
            ],
          },
          {
            tag: 'section1-3',
            links: [
              {
                url: 'https://example.com/code4',
                type: 'CODE',
                description: 'Code 4 is important',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    owner: 'owner2',
    repo: 'repo3',
    sections: [
      {
        tag: 'section1',
        links: [
          {
            url: 'https://example.com/website3',
            type: 'WEBSITE',
            description: 'Website 3 is recommended',
          },
          {
            url: 'https://example.com/code4',
            type: 'CODE',
            description: 'Code 4 is everywhere',
          },
        ],
      },
    ],
  },
]

export const testResources: TestResource[] = testListContents.reduce((resources: TestResource[], listContent) => {
  const visitSection = (listContent: TestListContent, section: TestListSection, previousTags: string[]) => {
    const tags = [...previousTags, section.tag]

    section.links?.forEach((sectionLink) => {
      const resourceLink: TestResourceLink = {
        listOwner: listContent.owner,
        listRepo: listContent.repo,
        description: sectionLink.description,
        tags,
      }

      const existingResource = resources.find(({ url }) => url === sectionLink.url)

      if (existingResource) {
        existingResource.links.push(resourceLink)
        return
      }

      resources.push({
        url: sectionLink.url,
        type: sectionLink.type,
        links: [resourceLink],
      })
    })

    section.subSections?.forEach((subSection) => visitSection(listContent, subSection, tags))
  }

  listContent.sections.forEach((section) => visitSection(listContent, section, []))

  return resources
}, [])

export const testResourceFinder = createTestDataFinder(testResources, () => {
  const hasLinkToList = (owner: string, repo: string): Predicate<TestResource> => {
    return ({ links }) => links.some((link) => link.listOwner === owner && link.listRepo === repo)
  }

  return { hasLinkToList }
})
