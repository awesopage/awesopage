import { NextPage } from 'next'
import NextLink from 'next/link'

import { ListsPageProps } from 'pkg-app-shared/src/list/ListsPageProps'
import { DefaultPageLayout } from 'pkg-app-web/src/page/DefaultPageLayout'
import { Button } from 'pkg-lib-ui/src/button/Button'
import { Heading } from 'pkg-lib-ui/src/content/Heading'
import { Tag } from 'pkg-lib-ui/src/content/Tag'
import { Text } from 'pkg-lib-ui/src/content/Text'
import { useColorModeValue } from 'pkg-lib-ui/src/hook/ThemeHooks'
import { Box } from 'pkg-lib-ui/src/layout/Box'
import { Grid } from 'pkg-lib-ui/src/layout/Grid'
import { Stack } from 'pkg-lib-ui/src/layout/Stack'

export const ListsPage: NextPage<ListsPageProps> = ({ lists }) => {
  const bgColor = useColorModeValue('white', 'black')
  const titleColor = useColorModeValue('primary.600', 'primary.200')
  return (
    <DefaultPageLayout>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={5}>
        {lists.map((list) => (
          <Box key={list.id} bg={bgColor} boxShadow={'2xl'} p={5}>
            <Stack minH={'200px'}>
              <Text fontWeight={800} fontSize={'sm'}>
                {list.starCount} &#9734;
              </Text>
              <Heading color={titleColor} fontSize={'2xl'}>
                {list.repoKey}
              </Heading>
              <Text minH={'50px'}> {list.description} </Text>
              <Text>
                {list.tags.map((tag) => (
                  <Tag key={tag} mr={2}>
                    {tag}
                  </Tag>
                ))}
              </Text>
            </Stack>
            <NextLink href={`https://github.com/${list.repoKey}`} passHref>
              <Button as='a' colorScheme='primary' variant='outline' size='sm' w={'full'}>
                View in Github
              </Button>
            </NextLink>
          </Box>
        ))}
      </Grid>
    </DefaultPageLayout>
  )
}
