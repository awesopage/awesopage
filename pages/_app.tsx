import { AppProps } from 'next/app'

import { AppProvider } from 'pkg-app-web/src/app/AppProvider'

const AwesopageApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default AwesopageApp
