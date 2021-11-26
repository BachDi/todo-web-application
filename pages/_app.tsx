import { Provider } from 'mobx-react'
import type { AppProps } from 'next/app'
import { rootStore } from '../stores'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider {...rootStore}>
      <Component {...pageProps} />
      <ToastContainer theme="colored" />
    </Provider>
  )
}

export default App
