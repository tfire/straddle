import {
  useWeb3,
  useConnectorMetamask,
  useConnectorCoinbase,
  useConnectorWalletConnect,
  useConnectorTrust,
  useDisconnect,
} from "@lido-sdk/web3-react";

import {Modal, ModalContent} from "../styles/components";

export default function ConnectWalletModal({openModal, closeModal}) {

  const {  account } = useWeb3();
  const metamask = useConnectorMetamask();
  const coinbase = useConnectorCoinbase();
  const trust = useConnectorTrust();
  const walletconnect = useConnectorWalletConnect();
  const { disconnect } = useDisconnect();

  return (
    <Modal>
      <ModalContent>
        {!account ?
          <>
        <button onClick={() => metamask.connect()}>Connect with Metamask</button>
        <button onClick={() => walletconnect.connect()}>Connect with WalletConnect</button>
        <button onClick={() => coinbase.connect()}>Connect with Coinbase</button>
        <button onClick={() => trust.connect()}>Connect with TrustWallet</button>
        </> :

        <button onClick={() => disconnect()}>Disconnect</button>
      }
      </ModalContent>
    </Modal>
  )
}
