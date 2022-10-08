import { Alert as ChakraAlert, AlertIcon as ChakraAlertIcon, AlertProps as ChakraAlertProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

export type AlertProps = ChakraAlertProps

export const Alert: FunctionComponent<AlertProps> = ({ children, ...props }) => {
  return (
    <ChakraAlert {...props}>
      <ChakraAlertIcon />
      {children}
    </ChakraAlert>
  )
}
