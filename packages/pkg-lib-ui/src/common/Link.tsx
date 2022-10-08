import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

export type LinkProps = ChakraLinkProps

export const Link: FunctionComponent<LinkProps> = (props) => {
  return <ChakraLink {...props} />
}
