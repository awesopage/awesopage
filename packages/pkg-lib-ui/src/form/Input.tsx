import { Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'
import type { ChangeEvent, FunctionComponent } from 'react'

export interface InputProps extends Omit<ChakraInputProps, 'onChange'> {
  readonly inputId: string
  readonly onChange: (value: string) => void
}

export const Input: FunctionComponent<InputProps> = ({ inputId, onChange, ...inputProps }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return <ChakraInput id={inputId} type='text' onChange={handleChange} {...inputProps} />
}
