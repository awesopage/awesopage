import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { ChangeEvent, FunctionComponent } from 'react'

export interface TextInputProps extends Omit<ChakraInputProps, 'onChange'> {
  readonly inputId: string
  readonly label: string
  readonly onChange: (value: string) => void
}

export const TextInput: FunctionComponent<TextInputProps> = ({ inputId, label, onChange, ...inputProps }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <ChakraFormControl>
      <ChakraFormLabel htmlFor={inputId}>{label}</ChakraFormLabel>
      <ChakraInput id={inputId} type='text' onChange={handleChange} {...inputProps} />
    </ChakraFormControl>
  )
}
