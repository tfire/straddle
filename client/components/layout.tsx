import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { UnsupportedChainIdError, useWeb3 } from "@lido-sdk/web3-react";
import { ethers } from "ethers";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import ConnectWalletModal from "./connectWalletModal";
import NetworkSelectionModal from "./networkSelectionModal";

const Layout = ({ children }) => {
  const {
    isOpen: isOpenModal,
    onOpen: openModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const { account, error } = useWeb3();
  const [name, setName] = useState<string>("");
  const provider = ethers.providers.getDefaultProvider();
  const switchToggle = useDisclosure();

  const router = useRouter();
  const isWrongNetwork = !!error && error instanceof UnsupportedChainIdError;

  useEffect(() => {
    const getName = async () => {
      const name = await provider.lookupAddress(account);
      if (name) {
        setName(name);
      } else {
        setName(account.substring(0, 6) + "..." + account.substring(36));
      }
    };

    if (account) {
      getName();
    }
  }, [account, provider]);

  return (
    <Box
      height="100%"
      width="100%"
      maxWidth={"700px"}
      m="auto"
      pt="10px"
      className={styles.container}
      userSelect="none"
    >
      <Head>
        <title>Straddle</title>
        <meta name="description" content="ETH App" />
        <link rel="icon" href="/favicon0.ico" />
      </Head>

      <ConnectWalletModal
        closeModal={onCloseModal}
        isOpenModal={isOpenModal}
        openModal={openModal}
      />

      <Flex justify="space-between" alignItems="center" mb={2}>
        <Text fontSize="14px" variant="medium">
          ⚖️ Straddle.Finance
        </Text>
        {!isWrongNetwork && !account && (
          <Button
            variant="primary"
            onClick={() => {
              openModal();
              console.log("connect wallet");
            }}
          >
            Connect Wallet
          </Button>
        )}
        {isWrongNetwork && (
          <Button variant="primary" onClick={switchToggle.onOpen}>
            Switch Network
          </Button>
        )}
        {account && !isWrongNetwork && (
          <Button variant="primary" onClick={openModal}>
            {name}
          </Button>
        )}
      </Flex>

      <Flex
        borderWidth="2px"
        borderStyle="dashed"
        borderColor="white"
        justify="space-between"
      >
        <Flex gap={2}>
          <Button
            onClick={() => {
              router.push("/");
            }}
            variant="secondary"
          >
            home
          </Button>
          <Link
            _hover={{ fontStyle: "none" }}
            href="https://github.com/tfire/straddle"
            target="_blank"
          >
            <Button variant="secondary">docs</Button>
          </Link>
          <Link
            _hover={{ fontStyle: "none" }}
            href="https://discord.gg"
            target="_blank"
          >
            <Button variant="secondary">discord</Button>
          </Link>
          <Link
            _hover={{ fontStyle: "none" }}
            href="https://twitter.com/straddlefi"
            target="_blank"
          >
            <Button variant="secondary">twitter</Button>
          </Link>
        </Flex>

        <Flex gap={2}>
          <Button variant="secondary" onClick={() => router.push("/staking")}>
            staking
          </Button>
          <Button variant="secondary" onClick={() => router.push("/rewards")}>
            rewards
          </Button>
          <Button variant="secondary" onClick={() => router.push("/treasury")}>
            treasury
          </Button>
        </Flex>
      </Flex>
      {account && (
        <Stack
          borderWidth="2px"
          borderStyle="dashed"
          borderColor="white"
          p={2}
          mt={2}
        >
          {children}
        </Stack>
      )}
      {!isWrongNetwork && !account && (
        <Text textAlign="center" mt={10} fontWeight="bold" fontSize="3xl">
          Connect Wallet to continue
        </Text>
      )}
      {isWrongNetwork && (
        <Container textAlign="center" fontSize="3xl" fontWeight="bold" mt={10}>
          <Text>
            You&apos;re connected to the wrong network. Please switch network to
            continue.
          </Text>
          <Button fontSize="xl" onClick={switchToggle.onOpen} variant="primary">
            Switch Network
          </Button>
        </Container>
      )}
      {switchToggle.isOpen && (
        <NetworkSelectionModal switchToggle={switchToggle} />
      )}
    </Box>
  );
};

export default Layout;
