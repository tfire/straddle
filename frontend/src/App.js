import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import React, { useEffect, useState } from "react";

import { Body, Button, Header, Image, Link } from "./components";
// import logo from "./ethereumLogo.png";
import useWeb3Modal from "./hooks/useWeb3Modal";

import { MAINNET_ID, addresses } from "./addresses";

import { AboutView, HomeView, StakingView, RewardsView, TreasuryView } from "./components/ApplicationViews"

// import { useQuery } from "@apollo/react-hooks";
// import GET_LENDING_POOL_CONFIGURATION_HISTORY_ITEMS from "./graphql/subgraph";


async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = getDefaultProvider();
  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
  // const aDAIContract = new Contract(addresses[MAINNET_ID].tokens.aDAI, abis.aToken, defaultProvider);
  // A pre-defined address that owns some aDAI tokens
  // const aDAIBalance = await aDAIContract.balanceOf("0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C");
  // console.log({ aDAIBalance: aDAIBalance.toString() });
}

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  const [account, setAccount] = useState("");
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    async function fetchAccount() {
      try {
        if (!provider) {
          return;
        }

        // Load the user's accounts.
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);

        // Resolve the ENS name for the first account.
        const name = await provider.lookupAddress(accounts[0]);

        // Render either the ENS name or the shortened account address.
        if (name) {
          setRendered(name);
        } else {
          setRendered(account.substring(0, 6) + "..." + account.substring(36));
        }
      } catch (err) {
        setAccount("");
        setRendered("");
        console.error(err);
      }
    }
    fetchAccount();
  }, [account, provider, setAccount, setRendered]);

  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
}

function App(props) {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  return (
    <div className="container unselectable">
      <Header>
        <p>⚖️ Straddle.Finance</p>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
      </Header>
      <Body>
        <div className="application-header">
          <div className="application-header-left">
            <Button onClick={() => window.open("/", "_self")}>home</Button>
            <Button onClick={() => window.open("https://github.com/tfire/straddle")}>docs</Button>
            <Button onClick={() => window.open("https://discord.com")}>discord</Button>
            <Button onClick={() => window.open("https://twitter.com/straddlefi")}>twitter</Button>
          </div>
          <div className="application-header-right">
            <Button onClick={() => window.open("/staking", "_self")}>staking</Button>
            <Button onClick={() => window.open("/rewards", "_self")}>rewards</Button>
            <Button onClick={() => window.open("/treasury", "_self")}>treasury</Button>
          </div>
        </div>
        <div className="application-body">
          {
            props.which_view === "home" ? <HomeView/> 
            :props.which_view === "about"? <AboutView/>
            :props.which_view === "staking"? <StakingView/>
            :props.which_view === "rewards"? <RewardsView/>
            :props.which_view === "treasury"? <TreasuryView/>
            :''
          }
        </div>
      </Body>
    </div>
  )
}

export default App;
