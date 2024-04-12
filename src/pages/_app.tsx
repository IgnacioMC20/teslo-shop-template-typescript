import '@/styles/globals.css'
import '@fontsource/roboto/700.css'
import 'react-slideshow-image/dist/styles.css'
import 'react-toastify/dist/ReactToastify.css'

import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import { SWRConfig } from 'swr'

import { AuthProvider, CartProvider, UIProvider } from '@/context'
import { lightTheme } from '@/themes'

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
    {/* // SWR */}
      <SWRConfig
        value={{
          // refreshInterval: 3000,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}>
        {/* contexto para auth */}
        <AuthProvider>
          {/* contexto carrito */}
          <CartProvider>
            {/* Proveedor del contexto de UI */}
            <UIProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
                <ToastContainer />
              </ThemeProvider>
            </UIProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
