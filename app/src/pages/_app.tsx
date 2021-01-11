import { AppProps } from 'next/app'
import '../global-styles/global-styles.scss'
import withLazyLoading from '../components/Utilities/withLazyLoading'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default withLazyLoading(MyApp)
