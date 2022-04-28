import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Heading,
  ModalCloseButton,
  ModalBody,
  Stack,
  Button,
  Image,
  Text,
  Spinner,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { useDisconnect, useWeb3 } from "@lido-sdk/web3-react";
import { DisconnectWallet } from "./WalletSelection";

export default function NetworkSelectionModal({ switchToggle }) {
  const { chainId, connector } = useWeb3();
  const { disconnect } = useDisconnect();

  const switchNetwork = async (chain: string) => {
    if (chain && chainId && chain === chainId.toString()) return;

    let ethereum = window.ethereum;

    try {
      if (ethereum) {
        // @ts-expect-error
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `${chain}` }],
        });
      } else {
        await (connector as any).activate(chain);
      }
    } catch (error) {
      console.error(error);

      alert("Error while switching network");

      if (error === 4001) {
        setCanceled(true);
        switching.onClose();
      }
    }
  };

  const { colorMode } = useColorMode();

  const switching = useDisclosure();

  const [wasCanceled, setCanceled] = useState(false);

  const switchingStarted = async (chain: string) => {
    switching.onOpen();
    await switchNetwork(chain);
    switchToggle.onClose();
    switching.onClose();
  };

  return (
    <>
      <Modal
        size="sm"
        isOpen={switchToggle.isOpen}
        onClose={switchToggle.onClose}
        isCentered
      >
        <ModalOverlay filter="auto" blur="1rem" />
        <ModalContent>
          <ModalHeader>
            <Heading variant="medium">Switch Network</Heading>
          </ModalHeader>
          <ModalCloseButton
            _focus={{ boxShadow: "none" }}
            onClick={switchToggle.onClose}
          />

          <ModalBody
            py={8}
            borderTop="solid 1px"
            borderColor={colorMode === "dark" ? "#232323" : "#F3F3F3"}
          >
            {wasCanceled ? (
              "You canceled the chain request"
            ) : (
              <Stack>
                <Button
                  variant="ghost"
                  w="100%"
                  h="56px"
                  justifyContent="left"
                  onClick={() => {
                    switchingStarted("0x4");
                  }}
                >
                  <Heading variant="small">Rinkeby</Heading>
                </Button>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter justifyContent="center">
            <DisconnectWallet
              onClick={async () => {
                switchToggle.onClose;
                await disconnect();
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        size="sm"
        isOpen={switching?.isOpen}
        onClose={switching?.onClose}
        isCentered
      >
        <ModalOverlay filter="auto" blur="1rem" />
        <ModalContent>
          <ModalHeader>
            <Heading variant="medium">Connecting...</Heading>
          </ModalHeader>
          <ModalCloseButton
            _focus={{ boxShadow: "none" }}
            onClick={switching && switching.onClose}
          />

          <ModalBody
            py={8}
            borderTop="solid 1px"
            borderColor={colorMode === "dark" ? "#232323" : "#F3F3F3"}
          >
            <Button
              variant={"ghost"}
              w="100%"
              h="56px"
              justifyContent="space-between"
              rightIcon={<Spinner />}
            >
              <Text>Switching to another chain...</Text>
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
