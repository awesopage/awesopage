import { Icon as ChakraIcon, IconProps as ChakraIconProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { IconType } from 'react-icons'

export interface IconProps extends ChakraIconProps {
  readonly as: IconType
}

export const Icon: FunctionComponent<IconProps> = (props) => {
  return <ChakraIcon {...props} />
}

export type SvgIconProps = ChakraIconProps

export const SvgIcon: FunctionComponent<SvgIconProps> = (props) => {
  return <ChakraIcon {...props} />
}
