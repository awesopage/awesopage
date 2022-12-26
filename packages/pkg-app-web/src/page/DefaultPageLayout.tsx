import type { FunctionComponent, PropsWithChildren } from 'react'

import { NavigationBar } from 'pkg-app-web/src/page/NavigationBar'
import { useColorModeValue } from 'pkg-lib-ui/src/hook/ThemeHooks'
import { Box } from 'pkg-lib-ui/src/layout/Box'
import { Container } from 'pkg-lib-ui/src/layout/Container'
import { Flex } from 'pkg-lib-ui/src/layout/Flex'
import { SPACE_MEDIUM } from 'pkg-lib-ui/src/theme/SpaceValues'

export const DefaultPageLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const backgroundColor = useColorModeValue('blackAlpha.50', 'background.900')

  return (
    <Flex flexFlow='column' height='full'>
      <NavigationBar />
      <Box backgroundColor={backgroundColor} flex={1} overflowX='hidden' overflowY='auto'>
        <Container maxWidth='container.xl' paddingY={SPACE_MEDIUM}>
          {children}
        </Container>
      </Box>
    </Flex>
  )
}
