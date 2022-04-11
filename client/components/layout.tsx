import { Box, Button, Flex, Stack, Link, Text, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import ConnectWalletModal from "./connectWalletModal";

import {useRouter} from "next/router";

const Layout = ({ children }) => {
  const {isOpen: isOpenModal, onOpen: openModal, onClose: onCloseModal} = useDisclosure();

  const router = useRouter();

  return (
    <Box
      height="100%"
      width="100%"
      maxWidth={"700px"}
      m="auto"
      pt="10px"
      className={styles.container}
    >
      <Head>
        <title>Straddle</title>
        <meta name="description" content="ETH App" />
        <link rel="icon" href="/favicon0.ico" />
      </Head>

      {isOpenModal && (
        <ConnectWalletModal closeModal={onCloseModal} openModal={openModal} />
      )}

        <Flex justify='space-between' alignItems='center' mb={2}>
          <Text fontSize='14px' variant="medium">⚖️ Straddle.Finance</Text>
          <Button variant='primary' onClick={() => openModal()}>Connect Wallet</Button>
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
            href="https://discord.com"
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
          <Button variant='secondary' onClick={() => router.push('/staking')}>staking</Button>
          <Button variant='secondary' onClick={() => router.push('/rewards')}>rewards</Button>
          <Button variant='secondary' onClick={() => router.push('/treasury')}>treasury</Button>
        </Flex>
        </Flex>

        <Stack
          borderWidth="2px"
          borderStyle="dashed"
          borderColor="white"
          p={2}
          mt={2}
        >
          {children}
        </Stack>
    </Box>
  );
};

export default Layout;
