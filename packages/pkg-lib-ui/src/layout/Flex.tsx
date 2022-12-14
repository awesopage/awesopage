import { Flex as ChakraFlex, FlexProps as ChakraFlexProps } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'

export type FlexProps = ChakraFlexProps

export const Flex: FunctionComponent<FlexProps> = (props) => {
  return <ChakraFlex {...props} />
}
