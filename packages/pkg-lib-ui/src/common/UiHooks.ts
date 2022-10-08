import { useDisclosure as useChakraDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'

export const useDisclosure = useChakraDisclosure

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
