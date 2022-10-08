import { ButtonGroup as ChakraButtonGroup, ButtonGroupProps as ChakraButtonGroupProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import { SPACE_SMALL } from 'pkg-lib-ui/src/theme/SpaceValues'

export type ButtonGroupProps = ChakraButtonGroupProps

export const ButtonGroup: FunctionComponent<ButtonGroupProps> = (props) => {
  return <ChakraButtonGroup spacing={SPACE_SMALL} {...props} />
}
