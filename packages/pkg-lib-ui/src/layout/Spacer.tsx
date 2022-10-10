import { Spacer as ChakraSpacer, SpacerProps as ChakraSpacerProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

export type SpacerProps = ChakraSpacerProps

export const Spacer: FunctionComponent<SpacerProps> = (props) => {
  return <ChakraSpacer {...props} />
}
