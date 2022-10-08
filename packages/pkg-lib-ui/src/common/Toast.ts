import { AlertStatus as ChakraAlertStatus, useToast as useChakraToast } from '@chakra-ui/react'

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
