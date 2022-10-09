import { Text as ChakraText, TextProps as ChakraTextProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

export type TextProps = ChakraTextProps

export const Text: FunctionComponent<TextProps> = (props) => {
  return <ChakraText {...props} />
}
