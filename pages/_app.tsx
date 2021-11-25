import { Provider } from 'mobx-react'
import type { AppProps } from 'next/app'
import { rootStore } from '../stores'
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider {...rootStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
