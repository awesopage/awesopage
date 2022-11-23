import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export type ButtonProps = ChakraButtonProps

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <ChakraButton ref={ref} size='sm' {...props} />
})
