import NextLink from 'next/link'
import { FunctionComponent } from 'react'
import { IoLogoGithub } from 'react-icons/io5'

import { ColorModeToggle } from 'pkg-app-web/src/page/ColorModeToggle'
import { Logo } from 'pkg-app-web/src/page/Logo'
import { NavIcon } from 'pkg-app-web/src/page/NavIcon'
import { ButtonGroup } from 'pkg-lib-ui/src/button/ButtonGroup'
import { IconButton } from 'pkg-lib-ui/src/button/IconButton'
import { Link } from 'pkg-lib-ui/src/content/Link'
import { useColorModeValue } from 'pkg-lib-ui/src/hook/ThemeHooks'
import { Box } from 'pkg-lib-ui/src/layout/Box'
import { Container } from 'pkg-lib-ui/src/layout/Container'
import { Spacer } from 'pkg-lib-ui/src/layout/Spacer'
import { SPACE_SMALL } from 'pkg-lib-ui/src/theme/SpaceValues'

export const NavigationBar: FunctionComponent = () => {
  const borderColor = useColorModeValue('secondary.700', 'secondary.500')

  return (
    <Box borderBottomWidth={1} borderBottomColor={borderColor} paddingX={SPACE_SMALL}>
      <Container maxWidth='container.xl' display='flex' flexWrap='wrap' padding={1}>
        <NextLink href='/' passHref>
          <Link>
            <Logo />
          </Link>
        </NextLink>
        <Spacer />
        <ButtonGroup spacing={1}>
          <NextLink href='https://github.com/awesopage/awesopage' passHref>
            <IconButton as='a' aria-label='Awesopage GitHub' icon={<NavIcon as={IoLogoGithub} />} />
          </NextLink>
          <ColorModeToggle />
        </ButtonGroup>
      </Container>
    </Box>
  )
}
