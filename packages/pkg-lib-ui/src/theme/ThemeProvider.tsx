import { ChakraProvider, extendTheme, Theme, theme as baseTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { FunctionComponent, PropsWithChildren } from 'react'

export type ColorToken = keyof Theme['colors']

export interface CreateThemeOptions {
  readonly primaryColor: ColorToken
  readonly secondaryColor: ColorToken
}

export const createTheme = (options: CreateThemeOptions) => {
  return extendTheme(
    {
      initialColorMode: 'system',
      useSystemColorMode: false,
      colors: {
        primary: baseTheme.colors[options.primaryColor],
        secondary: baseTheme.colors[options.secondaryColor],
        background: baseTheme.colors.gray,
      },
      shadows: {
        outline: `0 0 0 1px ${baseTheme.colors.gray[700]}`,
      },
    },
    withDefaultColorScheme({ colorScheme: 'background' }),
  )
}

export interface ThemeProviderProps extends PropsWithChildren {
  readonly theme: ReturnType<typeof createTheme>
}

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ theme, children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
