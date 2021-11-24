import { Provider } from 'mobx-react'
import type { AppProps } from 'next/app'
import { rootStore } from '../stores'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider {...rootStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
