import { FormControl as ChakraFormControl, FormLabel as ChakraFormLabel } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import { Select, SelectProps } from 'pkg-lib-ui/src/form/Select'

export interface SelectInputProps extends SelectProps {
  readonly inputId: string
  readonly label: string
}

export const SelectInput: FunctionComponent<SelectInputProps> = ({ inputId, label, ...selectProps }) => {
  return (
    <ChakraFormControl>
      <ChakraFormLabel htmlFor={inputId}>{label}</ChakraFormLabel>
      <Select id={inputId} {...selectProps} />
    </ChakraFormControl>
  )
}
