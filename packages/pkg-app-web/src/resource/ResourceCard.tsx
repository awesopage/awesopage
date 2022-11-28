import NextLink from 'next/link'
import { FunctionComponent } from 'react'

import { ResourceDTO } from 'pkg-app-shared/src/resource/ResourceDTO'
import { Button } from 'pkg-lib-ui/src/button/Button'
import { ButtonGroup } from 'pkg-lib-ui/src/button/ButtonGroup'
import { Heading } from 'pkg-lib-ui/src/content/Heading'
import { Tag } from 'pkg-lib-ui/src/content/Tag'
import { Text } from 'pkg-lib-ui/src/content/Text'
import { useColorModeValue } from 'pkg-lib-ui/src/hook/ThemeHooks'
import { Card, CardBody, CardFooter } from 'pkg-lib-ui/src/layout/Card'
import { Stack } from 'pkg-lib-ui/src/layout/Stack'
import { SPACE_SMALL } from 'pkg-lib-ui/src/theme/SpaceValues'

export interface ResourceCardProps {
  readonly resource: ResourceDTO
}

export const ResourceCard: FunctionComponent<ResourceCardProps> = ({ resource }) => {
  const backgroundColor = useColorModeValue('white', 'background.700')

  return (
    <Card backgroundColor={backgroundColor} data-test-id={`resource-card/${resource.id}`}>
      <CardBody>
        <Heading fontSize='2xl'>{resource.url}</Heading>
        <Text fontWeight='semibold'>{resource.type}</Text>
        {resource.links.map((link) => (
          <Stack key={link.listRepoKey} paddingY={SPACE_SMALL}>
            <Text fontWeight='semibold'>{link.listRepoKey}</Text>
            <Text fontSize='lg' paddingY={SPACE_SMALL}>
              {link.description}
            </Text>
            <Text>
              {link.tags.map((tag) => (
                <Tag key={tag} colorScheme='secondary' marginTop={SPACE_SMALL} marginRight={SPACE_SMALL}>
                  {tag}
                </Tag>
              ))}
            </Text>
          </Stack>
        ))}
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <NextLink href={resource.url} passHref legacyBehavior>
            <Button as='a' colorScheme='primary' variant='outline'>
              View in {resource.domain}
            </Button>
          </NextLink>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
