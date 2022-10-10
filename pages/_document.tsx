import { Head, Html, Main, NextScript } from 'next/document'
import { FunctionComponent } from 'react'

import { appTheme } from 'pkg-app-web/src/app/AppTheme'
import { ColorModeScript } from 'pkg-lib-ui/src/theme/ColorModeScript'

const AwesopageDocument: FunctionComponent = () => {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <ColorModeScript initialColorMode={appTheme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default AwesopageDocument
