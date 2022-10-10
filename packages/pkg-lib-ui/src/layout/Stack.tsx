import { Stack as ChakraStack, StackProps as ChakraStackProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import { SPACE_SMALL } from 'pkg-lib-ui/src/theme/SpaceValues'

export type StackProps = ChakraStackProps

export const Stack: FunctionComponent<StackProps> = (props) => {
  return <ChakraStack spacing={SPACE_SMALL} {...props} />
}
