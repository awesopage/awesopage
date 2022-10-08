import NextHead from 'next/head'
import { FunctionComponent, PropsWithChildren } from 'react'

import { appTheme } from 'pkg-app-web/src/app/AppTheme'
import { useOrientationEffect } from 'pkg-lib-ui/src/common/UiHooks'
import { ThemeProvider } from 'pkg-lib-ui/src/theme/ThemeProvider'

export const AppProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  useOrientationEffect()

  return (
    <ThemeProvider theme={appTheme}>
      <NextHead>
        <title>Awesopage</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
        <link rel='icon' type='image/png' href='/favicon-32x32.png' sizes='32x32' />
        <link rel='icon' type='image/png' href='/favicon-16x16.png' sizes='16x16' />
      </NextHead>
      {children}
    </ThemeProvider>
  )
}
