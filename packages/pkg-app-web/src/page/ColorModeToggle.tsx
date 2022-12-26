import type { FunctionComponent } from 'react'
import { RiMoonFill, RiSunLine } from 'react-icons/ri'

import { NavIcon } from 'pkg-app-web/src/page/NavIcon'
import { IconButton } from 'pkg-lib-ui/src/button/IconButton'
import { useColorModeValue, useToggleColorMode } from 'pkg-lib-ui/src/hook/ThemeHooks'

export const ColorModeToggle: FunctionComponent = () => {
  const color = useColorModeValue(undefined, 'yellow.300')
  const { colorMode, toggleColorMode } = useToggleColorMode()

  return (
    <IconButton
      aria-label='Toggle color mode'
      icon={<NavIcon as={colorMode === 'light' ? RiMoonFill : RiSunLine} color={color} />}
      onClick={toggleColorMode}
    />
  )
}
