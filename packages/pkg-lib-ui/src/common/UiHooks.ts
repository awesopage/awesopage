import {
  AlertStatus as ChakraAlertStatus,
  useDisclosure as useChakraDisclosure,
  useToast as useChakraToast,
} from '@chakra-ui/react'
import { useEffect } from 'react'

export const useDisclosure = useChakraDisclosure

export type ToastStatus = ChakraAlertStatus

export const useToast = () => {
  const chakraToast = useChakraToast({
    position: 'bottom',
    duration: 2000,
  })

  const toast = (title: string, status: ToastStatus) => {
    chakraToast({ title, status })
  }

  return { toast }
}

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
