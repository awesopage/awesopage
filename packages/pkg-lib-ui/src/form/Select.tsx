import { Select as ChakraSelect, SelectProps as ChakraSelectProps } from '@chakra-ui/react'
import { ChangeEvent, FunctionComponent } from 'react'

export interface SelectProps extends Omit<ChakraSelectProps, 'onChange'> {
  readonly onChange: (value: string) => void
}

export const Select: FunctionComponent<SelectProps> = ({ onChange, ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }

  return <ChakraSelect onChange={handleChange} {...props} />
}
