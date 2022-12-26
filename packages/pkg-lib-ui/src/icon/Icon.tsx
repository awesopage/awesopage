import { Icon as ChakraIcon, IconProps as ChakraIconProps } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'
import type { IconType } from 'react-icons'

export interface IconProps extends ChakraIconProps {
  readonly as: IconType
}

export const Icon: FunctionComponent<IconProps> = (props) => {
  return <ChakraIcon {...props} />
}
