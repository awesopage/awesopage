import { Box as ChakraBox, BoxProps as ChakraBoxProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

export type BoxProps = ChakraBoxProps

export const Box: FunctionComponent<BoxProps> = (props) => {
  return <ChakraBox {...props} />
}
