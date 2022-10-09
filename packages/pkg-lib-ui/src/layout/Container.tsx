import { Container as ChakraContainer, ContainerProps as ChakraContainerProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

export type ContainerProps = ChakraContainerProps

export const Container: FunctionComponent<ContainerProps> = (props) => {
  return <ChakraContainer {...props} />
}
