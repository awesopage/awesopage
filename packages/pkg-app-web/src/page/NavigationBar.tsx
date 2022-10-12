import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, PropsWithChildren } from 'react'
import { IoLogoGithub } from 'react-icons/io5'

import { ColorModeToggle } from 'pkg-app-web/src/page/ColorModeToggle'
import { Logo } from 'pkg-app-web/src/page/Logo'
import { NavIcon } from 'pkg-app-web/src/page/NavIcon'
import { ButtonGroup } from 'pkg-lib-ui/src/button/ButtonGroup'
import { IconButton } from 'pkg-lib-ui/src/button/IconButton'
import { useColorModeValue } from 'pkg-lib-ui/src/hook/ThemeHooks'
import { Box } from 'pkg-lib-ui/src/layout/Box'
import { Container } from 'pkg-lib-ui/src/layout/Container'
import { Spacer } from 'pkg-lib-ui/src/layout/Spacer'
import { Link } from 'pkg-lib-ui/src/navigation/Link'
import { LinkBox, LinkOverlay } from 'pkg-lib-ui/src/navigation/LinkBox'
import { SPACE_MEDIUM, SPACE_SMALL } from 'pkg-lib-ui/src/theme/SpaceValues'

interface NavLinkProps extends PropsWithChildren {
  readonly href: string
  readonly currentPath: string
}

const NavLink: FunctionComponent<NavLinkProps> = ({ href, currentPath, children }) => {
  const isActive = currentPath === href || currentPath.startsWith(`${href}/`) || currentPath.startsWith(`${href}?`)
  const activeColor = useColorModeValue('primary.600', 'primary.200')

  return (
    <LinkBox
      color={isActive ? activeColor : undefined}
      _hover={{ color: activeColor }}
      borderBottomWidth={isActive ? 2 : 0}
      borderBottomColor={activeColor}
      paddingTop={SPACE_SMALL}
    >
      <NextLink href={href} passHref>
        <LinkOverlay fontWeight='semibold' paddingX={SPACE_MEDIUM}>
          {children}
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  )
}

export const NavigationBar: FunctionComponent = () => {
  const router = useRouter()

  const borderColor = useColorModeValue('secondary.700', 'secondary.500')

  return (
    <Box borderBottomWidth={1} borderBottomColor={borderColor} paddingX={SPACE_SMALL}>
      <Container maxWidth='container.xl' display='flex' flexWrap='wrap' paddingX={1}>
        <Box paddingY={1}>
          <NextLink href='/' passHref>
            <Link>
              <Logo />
            </Link>
          </NextLink>
        </Box>
        <ButtonGroup variant='link' spacing={0} marginLeft={SPACE_MEDIUM}>
          <NavLink href='/lists' currentPath={router.asPath}>
            Lists
          </NavLink>
          <NavLink href='/resources' currentPath={router.asPath}>
            Resources
          </NavLink>
        </ButtonGroup>
        <Spacer />
        <ButtonGroup spacing={1} paddingY={1}>
          <NextLink href='https://github.com/awesopage/awesopage' passHref>
            <IconButton as='a' aria-label='Awesopage GitHub' icon={<NavIcon as={IoLogoGithub} />} />
          </NextLink>
          <ColorModeToggle />
        </ButtonGroup>
      </Container>
    </Box>
  )
}
