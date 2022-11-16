import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { IoLogoGithub } from 'react-icons/io5'

import { ColorModeToggle } from 'pkg-app-web/src/page/ColorModeToggle'
import { Logo } from 'pkg-app-web/src/page/Logo'
import { NavIcon } from 'pkg-app-web/src/page/NavIcon'
import { UserMenu } from 'pkg-app-web/src/page/UserMenu'
import { ButtonGroup } from 'pkg-lib-ui/src/button/ButtonGroup'
import { IconButton } from 'pkg-lib-ui/src/button/IconButton'
import { useColorModeValue } from 'pkg-lib-ui/src/hook/ThemeHooks'
import { Box } from 'pkg-lib-ui/src/layout/Box'
import { Container } from 'pkg-lib-ui/src/layout/Container'
import { Spacer } from 'pkg-lib-ui/src/layout/Spacer'
import { Link } from 'pkg-lib-ui/src/navigation/Link'
import { LinkBox, LinkOverlay } from 'pkg-lib-ui/src/navigation/LinkBox'
import { SPACE_MEDIUM, SPACE_SMALL } from 'pkg-lib-ui/src/theme/SpaceValues'

interface NavLinkProps {
  readonly href: string
  readonly text: string
  readonly currentPath: string
  readonly activeColor: string
}

const NavLink: FunctionComponent<NavLinkProps> = ({ href, text, currentPath, activeColor }) => {
  const isActive = currentPath === href || currentPath.startsWith(`${href}/`) || currentPath.startsWith(`${href}?`)

  return (
    <LinkBox
      color={isActive ? activeColor : undefined}
      _hover={{ color: activeColor }}
      borderBottomWidth={isActive ? 2 : 0}
      borderBottomColor={activeColor}
      paddingTop={SPACE_SMALL}
    >
      <NextLink href={href} passHref legacyBehavior>
        <LinkOverlay fontWeight='semibold' paddingX={SPACE_MEDIUM}>
          {text}
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  )
}

export const NavigationBar: FunctionComponent = () => {
  const router = useRouter()

  const borderColor = useColorModeValue('secondary.700', 'secondary.500')
  const activeColor = useColorModeValue('primary.600', 'primary.200')

  const navLinkProps = { currentPath: router.asPath, activeColor }

  return (
    <Box borderBottomWidth={1} borderBottomColor={borderColor} paddingX={SPACE_SMALL}>
      <Container maxWidth='container.xl' display='flex' flexWrap='wrap' paddingX={1}>
        <Box paddingY={1}>
          <Link as={NextLink} href='/' data-test-id='logo'>
            <Logo />
          </Link>
        </Box>
        <ButtonGroup variant='link' spacing={0} marginLeft={SPACE_MEDIUM}>
          <NavLink href='/lists' text='Lists' {...navLinkProps} />
          <NavLink href='/resources' text='Resources' {...navLinkProps} />
        </ButtonGroup>
        <Spacer />
        <ButtonGroup spacing={1} paddingY={1}>
          <NextLink href='https://github.com/awesopage/awesopage' passHref legacyBehavior>
            <IconButton as='a' aria-label='Awesopage GitHub' icon={<NavIcon as={IoLogoGithub} />} />
          </NextLink>
          <ColorModeToggle />
          <UserMenu />
        </ButtonGroup>
      </Container>
    </Box>
  )
}
