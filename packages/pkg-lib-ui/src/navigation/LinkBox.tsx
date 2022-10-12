import {
  LinkBox as ChakraLinkBox,
  LinkBoxProps as ChakraLinkBoxProps,
  LinkOverlay as ChakraLinkOverlay,
  LinkOverlayProps as ChakraLinkOverlayProps,
} from '@chakra-ui/react'
import { forwardRef, FunctionComponent } from 'react'

export type LinkBoxProps = ChakraLinkBoxProps

export const LinkBox: FunctionComponent<LinkBoxProps> = (props) => {
  return <ChakraLinkBox {...props} />
}

export type LinkOverlayProps = ChakraLinkOverlayProps

export const LinkOverlay = forwardRef<HTMLAnchorElement, LinkOverlayProps>((props, ref) => {
  return <ChakraLinkOverlay ref={ref} {...props} />
})
