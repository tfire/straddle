import { useWeb3 } from "@lido-sdk/web3-react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Button } from "../styles/components";
import abi from "../public/abis/straddle-abi.json";
import { getRpcProvider } from "@lido-sdk/providers";
import { CHAINS } from "@lido-sdk/constants";
import { rpc } from "./staking";
import { Flex, Text } from "@chakra-ui/react";

export default function Rewards() {
  const { account } = useWeb3();
  const [claimLoading, setClaimLoading] = useState(false);
  const contractAddress = "0xf72Cabed72b3936E0F952b5E96a5d95A4Ec776DF";
  const [netRewards, setNetRewards] = useState(0);
  const providerRpc = getRpcProvider(
    CHAINS.Rinkeby,
    `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
  );

  const [fetchingData, setFetchingData] = useState(false);

  const [balance, setBalance] = useState();
  const [rewardsClaimed, setRewardsClaimed] = useState();

  useEffect(() => {
    const fetchBalance = async () => {
      setFetchingData(true);
      if (account) {
        try {
          const { ethereum } = window;
          const provider = new ethers.providers.Web3Provider(ethereum);
          const contract = new ethers.Contract(
            contractAddress,
            abi.abi,
            provider.getSigner()
          );

          const calculateRewards = await contract.calculateRewards(account);
          setNetRewards(calculateRewards);
          const userAccounts = await contract.userAccounts(account);
          console.log("userAccounts: ", userAccounts);
          // console.log('balance: ',balance);
          setBalance(userAccounts[0]?.toString());
          setRewardsClaimed(userAccounts[1]?.toString());
          setFetchingData(false);
        } catch (error) {
          console.log("Error while fetching userBalance", error);
          setFetchingData(false);
        }
      }
    };
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

      {fetchingData ? (
        <Text textAlign="center" fontWeight="semibold" fontSize="xl">
          Fetching Data
        </Text>
      ) : (
        <div id="rewards-view-container">
          <div>
            <Flex gap={2}>
              <b>BALANCE: </b>
              <p>{balance} Strad</p>
            </Flex>
            {netRewards > 0 ? (
              <Button disabled={claimLoading} onClick={claimRewards}>
                {claimLoading ? "Loading..." : `Claim ${netRewards} Strad`}
              </Button>
            ) : (
              <Text textAlign="left" fontWeight="semibold" fontSize="md">
                You dont have any rewards to claim
              </Text>
            )}
          </div>
          <Flex gap={2}>
            <b>PAST</b>
            <p>{rewardsClaimed}</p>
          </Flex>
        </div>
      )}
    </div>
  );
}
