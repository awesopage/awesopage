import { Grid as ChakraGrid, GridProps as ChakraGridProps } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

export type GridProps = ChakraGridProps

export const Grid: FunctionComponent<GridProps> = (props) => {
  return <ChakraGrid {...props} />
}
