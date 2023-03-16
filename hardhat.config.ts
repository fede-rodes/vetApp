require("dotenv").config();
require("@vechain.energy/hardhat-thor");
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./svelte/src/artifacts",
  },
  networks: {
    hardhat: {
      // See: https://hardhat.org/hardhat-network/docs/metamask-issue
      chainId: 1337,
    },
    vechain: {
      url: "https://testnet.veblocks.net",
      // @ts-ignore
      privateKey: process.env.WALLET_PRIVATE_KEY,
      // delegateUrl: "https://sponsor-testnet.vechain.energy/by/#",
      blockGasLimit: 10000000,
    },
  },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },
};

export default config;
