import { Heading as ChakraHeading, HeadingProps as ChakraHeadingProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

export type HeadingProps = ChakraHeadingProps

export const Heading: FunctionComponent<HeadingProps> = (props) => {
  return <ChakraHeading {...props} />
}
