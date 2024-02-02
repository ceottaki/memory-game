import { AppProps } from 'next/app'

import '../global-styles/global-styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
