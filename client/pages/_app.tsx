import '../styles/globals.css'
import '../styles/Home.module.css'
import type { AppProps } from 'next/app'
import { ProviderWeb3 } from "@lido-sdk/web3-react";
import { ChakraProvider} from '@chakra-ui/react'

import { rpc, supportedChainIds } from "../constants/web3data"
import { theme } from '../theme';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProviderWeb3
    defaultChainId={4}
    supportedChainIds={supportedChainIds}
    rpc={rpc}
  >
  <ChakraProvider theme={theme}>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </ChakraProvider>
  </ProviderWeb3>
  )
}

export default MyApp
