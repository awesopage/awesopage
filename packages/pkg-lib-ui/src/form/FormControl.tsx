import { FormControl as ChakraFormControl, FormLabel as ChakraFormLabel } from '@chakra-ui/react'
import type { FunctionComponent, PropsWithChildren } from 'react'

export interface FormControlProps extends PropsWithChildren {
  readonly inputId: string
  readonly label: string
}

export const FormControl: FunctionComponent<FormControlProps> = ({ inputId, label, children }) => {
  return (
    <ChakraFormControl>
      <ChakraFormLabel htmlFor={inputId}>{label}</ChakraFormLabel>
      {children}
    </ChakraFormControl>
  )
}
