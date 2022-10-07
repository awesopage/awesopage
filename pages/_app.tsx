import { AppProps } from 'next/app'

import { AppProvider } from 'ap-app-web/src/app/AppProvider'

const AwesopageApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default AwesopageApp
