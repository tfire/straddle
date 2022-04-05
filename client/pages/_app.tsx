import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ProviderWeb3 } from "@lido-sdk/web3-react";

import { rpc, supportedChainIds } from "../constants/web3data";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProviderWeb3
    defaultChainId={1}
    supportedChainIds={supportedChainIds}
    rpc={rpc}
  >
    <Component {...pageProps} />
  </ProviderWeb3>
  )
}

export default MyApp
