import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ProviderWeb3 } from "@lido-sdk/web3-react";
import { ChakraProvider, DarkMode, extendTheme, ThemeConfig } from '@chakra-ui/react'

import { rpc, supportedChainIds } from "../constants/web3data"

const config: ThemeConfig = {
  initialColorMode: 'dark',
}

const theme = extendTheme({
  config
});

function MyApp({ Component, pageProps }: AppProps) {
  return (<ChakraProvider theme={theme}>
    <ProviderWeb3
    defaultChainId={1}
    supportedChainIds={supportedChainIds}
    rpc={rpc}
  >
    <Component {...pageProps} />
  </ProviderWeb3>
  </ChakraProvider>
  )
}

export default MyApp
