import { Box, Button, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import ConnectWalletModal from "./connectWalletModal";

const Layout = ({ children }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const closeModal = () => {
    setOpenModal(false);
  };
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

      {openModal && (
        <ConnectWalletModal closeModal={closeModal} openModal={openModal} />
      )}

      <div className="application-view">
        <Flex justify='space-between' alignItems='center' mb={2}>
          <Text fontSize='14px' variant="medium">⚖️ Straddle.Finance</Text>
          <Button variant='primary' onClick={() => setOpenModal(true)}>Connect Wallet</Button>
        </Flex>
        <Flex
          borderWidth="2px"
          borderStyle="dashed"
          borderColor="white"
          justify="space-between"
        >
          <Flex gap={2}>
            <Button variant='secondary'>home</Button>
            <Button variant='secondary'>docs</Button>
            <Button variant='secondary'>discord</Button>
            <Button variant='secondary'>twitter</Button>
          </Flex>
          <Flex gap={2}>
            <Button variant='secondary'>staking</Button>
            <Button variant='secondary'>rewards</Button>
            <Button variant='secondary'>treasury</Button>
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
      </div>
    </Box>
  );
};

export default Layout;
