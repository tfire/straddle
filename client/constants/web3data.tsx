import { CHAINS } from "@lido-sdk/constants";

export const supportedChainIds = [CHAINS.Rinkeby];

export const rpc = {
  [CHAINS.Mainnet]: "https://mainnet.infura.io/v3/82a643eff41e4983aa0f970348f0063f",
  [CHAINS.Rinkeby]: "https://rinkeby.arbitrum.io/rpc"
};
