import { Tag as ChakraTag, TagProps as ChakraTagProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

export type TagProps = ChakraTagProps

export const Tag: FunctionComponent<TagProps> = (props) => {
  return <ChakraTag {...props} />
}
