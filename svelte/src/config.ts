const CHAIN_ID = import.meta.env.VITE_CHAIN_ID;
// const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;

if (CHAIN_ID == null) throw new Error("Missing env var VITE_CHAIN_ID");

/**
 * JavaScript CAIP-2 representation object.
 * @see https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md
 */
export type ChainData = {
  name: string;
  chain: string;
  network: string;
  rpc: string[];
  faucets: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  icon?: string;
  explorers?: {
    name: string;
    url: string;
    icon?: string;
    standard: string;
  }[];
};

/**
 * @link https://github.com/ethereum-lists/chains
 */
export const CHAINS: Record<100009 | 100010, ChainData> = {
  100009: {
    name: "VeChain",
    chain: "VeChain",
    network: "main",
    rpc: ["https://mainnet.veblocks.net/"],
    faucets: [],
    nativeCurrency: {
      name: "VeChain",
      symbol: "VET",
      decimals: 18,
    },
    infoURL: "https://vechain.org",
    shortName: "vechain",
    chainId: 100009,
    networkId: 100009,
    explorers: [
      {
        name: "VeChain Stats",
        url: "https://vechainstats.com",
        standard: "none",
      },
      {
        name: "VeChain Explorer",
        url: "https://explore.vechain.org",
        standard: "none",
      },
    ],
  },
  100010: {
    name: "VeChain Testnet",
    chain: "VeChain",
    network: "test",
    rpc: ["https://testnet.veblocks.net/"],
    faucets: ["https://faucet.vecha.in"],
    nativeCurrency: {
      name: "VeChain",
      symbol: "VET",
      decimals: 18,
    },
    infoURL: "https://vechain.org",
    shortName: "vechain-testnet",
    chainId: 100010,
    networkId: 100010,
    explorers: [
      {
        name: "VeChain Explorer",
        url: "https://explore-testnet.vechain.org",
        standard: "none",
      },
    ],
  },
};
//   1: {
//     name: "Ethereum Mainnet",
//     chain: "ETH",
//     rpc: [`https://mainnet.infura.io/v3/${INFURA_API_KEY}`],
//     faucets: [],
//     nativeCurrency: {
//       name: "Ether",
//       symbol: "ETH",
//       decimals: 18,
//     },
//     // features: [{ name: "EIP155" }, { name: "EIP1559" }],
//     infoURL: "https://ethereum.org",
//     shortName: "eth",
//     chainId: 1,
//     networkId: 1,
//     icon: "ethereum",
//     explorers: [
//       {
//         name: "etherscan",
//         url: "https://etherscan.io",
//         icon: "etherscan",
//         standard: "EIP3091",
//       },
//     ],
//   },
//   5: {
//     name: "Goerli",
//     chain: "ETH",
//     rpc: [`https://goerli.infura.io/v3/${INFURA_API_KEY}`],
//     faucets: [
//       "http://fauceth.komputing.org?chain=5&address=${ADDRESS}",
//       "https://goerli-faucet.slock.it?address=${ADDRESS}",
//       "https://faucet.goerli.mudit.blog",
//     ],
//     nativeCurrency: {
//       name: "Goerli Ether",
//       symbol: "ETH",
//       decimals: 18,
//     },
//     infoURL: "https://goerli.net/#about",
//     shortName: "gor",
//     chainId: 5,
//     networkId: 5,
//     // ens: {
//     //   registry: "0x112234455c3a32fd11230c42e7bccd4a84e02010",
//     // },
//     explorers: [
//       {
//         name: "etherscan-goerli",
//         url: "https://goerli.etherscan.io",
//         standard: "EIP3091",
//       },
//     ],
//   },
//   1337: {
//     name: "Geth Testnet",
//     chain: "ETH",
//     rpc: ["http://127.0.0.1:8545"],
//     faucets: [],
//     nativeCurrency: {
//       name: "Geth Testnet Ether",
//       symbol: "ETH",
//       decimals: 18,
//     },
//     infoURL: "https://geth.ethereum.org",
//     shortName: "geth",
//     chainId: 1337,
//     networkId: 1337,
//   },
// };

export const chain = CHAINS[CHAIN_ID];
