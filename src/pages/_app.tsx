import '@/styles/globals.css'
import '@fontsource/roboto/700.css';
import 'react-slideshow-image/dist/styles.css'

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app'
import { lightTheme } from '../themes/light-theme';
import { SWRConfig } from 'swr';
import { UIProvider } from '@/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // SWR
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}>
        {/* Proveedor del contexto de UI */}
      <UIProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </SWRConfig>
  )
}
