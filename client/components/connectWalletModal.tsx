import {
  useWeb3,
  useConnectorMetamask,
  useConnectorCoinbase,
  useConnectorWalletConnect,
  useConnectorTrust,
  useDisconnect,
} from "@lido-sdk/web3-react";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function ConnectWalletModal({
  openModal,
  closeModal,
  isOpenModal,
}) {
  const { account } = useWeb3();
  const metamask = useConnectorMetamask();
  const coinbase = useConnectorCoinbase();
  const trust = useConnectorTrust();
  const walletconnect = useConnectorWalletConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    console.log("account: ", account);
  }, [account]);

  return (
    <Modal isOpen={isOpenModal} onClose={closeModal}>
      <ModalContent>
        <ModalBody>
          {!account ? (
            <Stack gap={2}>
              <Button
                onClick={async () => {
                  if (window.ethereum) {
                    await metamask.connect();
                    closeModal();
                  } else {
                    console.log("no metamask");
                  }
                }}
              >
                Connect with Metamask
              </Button>
              <Button onClick={walletconnect.connect}>
                Connect with WalletConnect
              </Button>
              <Button onClick={coinbase.connect}>Connect with Coinbase</Button>
              <Button onClick={trust.connect}>Connect with TrustWallet</Button>
            </Stack>
          ) : (
            <Stack gap={2}>
              <Button
                m="auto"
                onClick={async () => {
                  await disconnect();
                  closeModal();
                }}
              >
                Disconnect
              </Button>
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
