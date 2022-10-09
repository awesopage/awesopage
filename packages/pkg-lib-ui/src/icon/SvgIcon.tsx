import { Icon as ChakraIcon, IconProps as ChakraIconProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

export type SvgIconProps = ChakraIconProps

export const SvgIcon: FunctionComponent<SvgIconProps> = (props) => {
  return <ChakraIcon {...props} />
}
