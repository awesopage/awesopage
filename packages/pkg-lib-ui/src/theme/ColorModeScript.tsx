import {
  ColorModeScript as ChakraColorModeScript,
  ColorModeScriptProps as ChakraColorModeScriptProps,
} from '@chakra-ui/react'
import type { FunctionComponent } from 'react'

export type ColorModeScriptProps = ChakraColorModeScriptProps

export const ColorModeScript: FunctionComponent<ColorModeScriptProps> = (props) => {
  return <ChakraColorModeScript {...props} />
}
