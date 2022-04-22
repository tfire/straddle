import { useWeb3 } from "@lido-sdk/web3-react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Button } from "../styles/components";
import abi from "../public/abis/straddle-abi.json";
import { getRpcProvider } from "@lido-sdk/providers";
import { CHAINS } from "@lido-sdk/constants";
import { rpc } from "./staking";

export default function Rewards() {
  const { account } = useWeb3();
  const [claimLoading, setClaimLoading] = useState(false);
  const contractAddress = "0xf72Cabed72b3936E0F952b5E96a5d95A4Ec776DF";
  const providerRpc = getRpcProvider(CHAINS.Mainnet, rpc[CHAINS.Mainnet]);

  const [balance, setBalance] = useState();
  const [rewardsClaimed, setRewardsClaimed] = useState();

  useEffect(() => {
    const fetchBalance = async () => {
      if(account) {
        try {
          const contract = new ethers.Contract(
            contractAddress,
            abi.abi,
            providerRpc.getSigner()
          );

          const userAccount = await contract.userAccounts(account);
          setBalance(userAccount?.balance);
          setRewardsClaimed(userAccount?.rewardsClaimed);

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
        const contract = new ethers.Contract(
          contractAddress,
          abi.abi,
          providerRpc.getSigner()
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
          <b>BALANCE</b>
          <p>{balance}</p>
          <Button onClick={claimRewards}>Claim</Button>
        </div>
        <div>
          <b>PAST</b>
          <p>{rewardsClaimed}</p>
        </div>
      </div>
    </div>
  );
}
