import { useWeb3 } from "@lido-sdk/web3-react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Button } from "../styles/components";
import abi from "../public/abis/straddle-abi.json";
import { getRpcProvider } from "@lido-sdk/providers";
import { CHAINS } from "@lido-sdk/constants";
import { rpc } from "./staking";
import { Flex } from "@chakra-ui/react";

export default function Rewards() {
  const { account } = useWeb3();
  const [claimLoading, setClaimLoading] = useState(false);
  const contractAddress = "0xf72Cabed72b3936E0F952b5E96a5d95A4Ec776DF";
  const providerRpc = getRpcProvider(
    CHAINS.Rinkeby,
    `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
  );

  const [balance, setBalance] = useState();
  const [rewardsClaimed, setRewardsClaimed] = useState();

  useEffect(() => {
    const fetchBalance = async () => {
      if(account) {
        try {
          const { ethereum } = window;
          const provider = new ethers.providers.Web3Provider(ethereum);
          const contract = new ethers.Contract(
            contractAddress,
            abi.abi,
            provider.getSigner()
          );

          const userAccounts = await contract.userAccounts(account);
          console.log('userAccounts: ', userAccounts);
          // console.log('balance: ',balance);
          setBalance(userAccounts[0]?.toString());
          setRewardsClaimed(userAccounts[1]?.toString());

        } catch (error) {
          console.log('Error while fetching userBalance', error);
        } 
      }
    }
    fetchBalance();
  }, [account, providerRpc]);

  const claimRewards = async () => {
    setClaimLoading(true);
    if (!account) {
      alert("Connect wallet to create Deposit");
      return;
    }
    const { ethereum } = window;
    if (ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(
          contractAddress,
          abi.abi,
          provider.getSigner()
        );
        // await contract.approve(contractAddress, ethers.constants.MaxUint256.toString())

        const claim = await contract.claimRewards({
          gasLimit: 1000000,
        });
        await claim.wait();
        setClaimLoading(false);
        alert("Rewards Claimed successfully");
      } catch (error) {
        console.log(error);
        setClaimLoading(false);
        throw error;
      }
    }
  };

  return (
    <div className="application-view">
      <h1>REWARDS</h1>
      <br></br>

      <div id="rewards-view-container">
        <div>
          <Flex gap={2}>
          <b>BALANCE: </b>
          <p>{balance} Strad</p>
          </Flex>
          <Button onClick={claimRewards}>Claim</Button>
        </div>
        <Flex gap={2}>
          <b>PAST</b>
          <p>{rewardsClaimed}</p>
          </Flex>
      </div>
    </div>
  );
}
