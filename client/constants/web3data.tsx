import { Contract, utils, ethers } from "ethers";
import { CHAINS } from "@lido-sdk/constants";

export const supportedChainIds = [CHAINS.Mainnet];

export const rpc = {
  [CHAINS.Mainnet]: "https://mainnet.infura.io/v3/82a643eff41e4983aa0f970348f0063f"
};

export const wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
