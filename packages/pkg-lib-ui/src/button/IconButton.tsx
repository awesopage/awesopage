import { IconButton as ChakraIconButton, IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export type IconButtonProps = ChakraIconButtonProps

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  return <ChakraIconButton ref={ref} variant='ghost' size='sm' isRound {...props} />
})
