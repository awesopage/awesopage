import { extendTheme, Theme, theme as baseTheme, withDefaultColorScheme } from '@chakra-ui/react'

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
