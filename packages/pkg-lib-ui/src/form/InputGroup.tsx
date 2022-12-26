import {
  InputAddonProps as ChakraInputAddonProps,
  InputGroup as ChakraInputGroup,
  InputGroupProps as ChakraInputGroupProps,
  InputLeftAddon as ChakraInputLeftAddon,
  InputRightAddon as ChakraInputRightAddon,
} from '@chakra-ui/react'
import type { FunctionComponent } from 'react'

export type InputGroupProps = ChakraInputGroupProps

export const InputGroup: FunctionComponent<InputGroupProps> = (props) => {
  return <ChakraInputGroup {...props} />
}

export type InputAddonProps = ChakraInputAddonProps

export const InputLeftAddon: FunctionComponent<InputAddonProps> = (props) => {
  return <ChakraInputLeftAddon {...props} />
}

export const InputRightAddon: FunctionComponent<InputAddonProps> = (props) => {
  return <ChakraInputRightAddon {...props} />
}
