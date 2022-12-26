import {
  Alert as ChakraAlert,
  AlertIcon as ChakraAlertIcon,
  AlertProps as ChakraAlertProps,
  AlertStatus as ChakraAlertStatus,
  useToast as useChakraToast,
} from '@chakra-ui/react'
import type { FunctionComponent } from 'react'

export type AlertProps = ChakraAlertProps

export const Alert: FunctionComponent<AlertProps> = ({ children, ...props }) => {
  return (
    <ChakraAlert {...props}>
      <ChakraAlertIcon />
      {children}
    </ChakraAlert>
  )
}

export type ToastStatus = ChakraAlertStatus

export const useToast = () => {
  const chakraToast = useChakraToast({
    position: 'bottom',
    duration: 2_000,
  })

  const toast = (title: string, status: ToastStatus) => {
    chakraToast({ title, status })
  }

  return { toast }
}
