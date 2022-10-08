import {
  useColorMode as useChakraColorMode,
  useColorModeValue as useChakraColorModeValue,
  useDisclosure as useChakraDisclosure,
} from '@chakra-ui/react'
import { useEffect } from 'react'

export const useDisclosure = useChakraDisclosure

export const useToggleColorMode = useChakraColorMode

export const useColorModeValue = useChakraColorModeValue

const repaintBody = () => {
  document.body.style.display = 'none'

  setTimeout(() => {
    document.body.style.display = 'block'
  }, 300)
}

export const useOrientationEffect = () => {
  useEffect(() => {
    window.addEventListener('orientationchange', repaintBody)

    return () => {
      window.removeEventListener('orientationchange', repaintBody)
    }
  }, [])
}
