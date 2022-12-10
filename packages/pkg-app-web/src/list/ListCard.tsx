import NextLink from 'next/link'
import { FunctionComponent } from 'react'

import { ListDTO } from 'pkg-app-shared/src/list/ListDTO'
import { Button } from 'pkg-lib-ui/src/button/Button'
import { ButtonGroup } from 'pkg-lib-ui/src/button/ButtonGroup'
import { Heading } from 'pkg-lib-ui/src/content/Heading'
import { Tag } from 'pkg-lib-ui/src/content/Tag'
import { Text } from 'pkg-lib-ui/src/content/Text'
import { useColorModeValue } from 'pkg-lib-ui/src/hook/ThemeHooks'
import { Card, CardBody, CardFooter } from 'pkg-lib-ui/src/layout/Card'
import { SPACE_SMALL } from 'pkg-lib-ui/src/theme/SpaceValues'

export interface ListCardProps {
  readonly list: ListDTO
}

export const ListCard: FunctionComponent<ListCardProps> = ({ list }) => {
  const backgroundColor = useColorModeValue('white', 'background.700')

  return (
    <Card backgroundColor={backgroundColor} data-test-id={`list-card/${list.owner}/${list.repo}`}>
      <CardBody>
        <Heading fontSize='2xl'>
          {list.owner}/{list.repo}
        </Heading>
        <Text fontWeight='semibold'>{list.starCount} &#9734;</Text>
        <Text fontSize='lg' paddingY={SPACE_SMALL}>
          {list.description}
        </Text>
        <Text>
          {list.tags.map((tag) => (
            <Tag key={tag} colorScheme='secondary' marginTop={SPACE_SMALL} marginRight={SPACE_SMALL}>
              {tag}
            </Tag>
          ))}
        </Text>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <NextLink href={`https://github.com/${list.owner}/${list.repo}`} passHref legacyBehavior>
            <Button as='a' colorScheme='primary' variant='outline'>
              View in GitHub
            </Button>
          </NextLink>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
