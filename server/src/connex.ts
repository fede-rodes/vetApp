// import { Framework } from "@vechain/connex-framework";
// import { Driver, SimpleNet, SimpleWallet } from "@vechain/connex-driver";

// const { WALLET_PRIVATE_KEY } = process.env;

// if (WALLET_PRIVATE_KEY == null) {
//   throw new Error("Missing env var WALLET_PRIVATE_KEY");
// }

// const wallet = new SimpleWallet();
// // add account by importing private key
// wallet.import(WALLET_PRIVATE_KEY);

// const driver = await Driver.connect(
//   new SimpleNet("https://testnet.veblocks.net"),
//   wallet
// );

// export const connex = new Framework(driver);

export {};
