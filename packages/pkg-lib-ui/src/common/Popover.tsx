import {
  Popover as ChakraPopover,
  PopoverBody as ChakraPopoverBody,
  PopoverContent as ChakraPopoverContent,
  PopoverContentProps as ChakraPopoverContentProps,
  PopoverHeader as ChakraPopoverHeader,
  PopoverHeaderProps as ChakraPopoverHeaderProps,
  PopoverProps as ChakraPopoverProps,
  PopoverTrigger as ChakraPopoverTrigger,
} from '@chakra-ui/react'
import { FunctionComponent, PropsWithChildren } from 'react'

import { Stack } from 'pkg-lib-ui/src/common/Stack'
import { SPACE_MEDIUM } from 'pkg-lib-ui/src/theme/SpaceValues'

export type PopoverProps = ChakraPopoverProps

export const Popover: FunctionComponent<PopoverProps> = (props) => {
  return <ChakraPopover gutter={SPACE_MEDIUM} placement='bottom-start' {...props} />
}

export const PopoverTrigger: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <ChakraPopoverTrigger>{children}</ChakraPopoverTrigger>
}

export type PopoverContentProps = ChakraPopoverContentProps

export const PopoverContent: FunctionComponent<PopoverContentProps> = (props) => {
  return <ChakraPopoverContent width={200} {...props} />
}

export type PopoverHeaderProps = ChakraPopoverHeaderProps

export const PopoverHeader: FunctionComponent<PopoverHeaderProps> = (props) => {
  return <ChakraPopoverHeader {...props} />
}

export const PopoverBody: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraPopoverBody>
      <Stack>{children}</Stack>
    </ChakraPopoverBody>
  )
}
