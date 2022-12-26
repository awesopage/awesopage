import { ChakraProvider } from '@chakra-ui/react'
import type { FunctionComponent, PropsWithChildren } from 'react'

import type { createTheme } from 'pkg-lib-ui/src/theme/ThemeFactory'

export interface ThemeProviderProps extends PropsWithChildren {
  readonly theme: ReturnType<typeof createTheme>
}

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ theme, children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
