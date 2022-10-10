import {
  useColorMode as useChakraColorMode,
  useColorModeValue as useChakraColorModeValue,
  useToken as useChakraToken,
} from '@chakra-ui/react'

export const useToggleColorMode = useChakraColorMode

export const useColorModeValue = useChakraColorModeValue

export const useColorToken = (...keys: string[]): string[] => {
  return useChakraToken('colors', keys)
}
