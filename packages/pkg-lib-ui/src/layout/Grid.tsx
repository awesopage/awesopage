import { Grid as ChakraGrid, GridProps as ChakraGridProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

import { SPACE_MEDIUM } from 'pkg-lib-ui/src/theme/SpaceValues'

export type GridProps = ChakraGridProps

export const Grid: FunctionComponent<GridProps> = (props) => {
  return <ChakraGrid gap={SPACE_MEDIUM} {...props} />
}
