import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Framework } from "@vechain/connex-framework";
import { Driver, SimpleNet, SimpleWallet } from "@vechain/connex-driver";

// import { connex } from "./connex";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const { VTHO_CONTRACT_ADDRESS, GREETER_CONTRACT_ADDRESS, WALLET_PRIVATE_KEY } =
  process.env;
console.log({
  VTHO_CONTRACT_ADDRESS,
  GREETER_CONTRACT_ADDRESS,
  WALLET_PRIVATE_KEY,
});

if (VTHO_CONTRACT_ADDRESS == null) {
  throw new Error("Missing env var VTHO_CONTRACT_ADDRESS");
}
if (GREETER_CONTRACT_ADDRESS == null) {
  throw new Error("Missing env var GREETER_CONTRACT_ADDRESS");
}
if (WALLET_PRIVATE_KEY == null) {
  throw new Error("Missing env var WALLET_PRIVATE_KEY");
}

const TARGET_USER_ADDRESS = "0x970248543238481b2AC9144a99CF7F47e28A90e0";

const pullABI = {
  inputs: [
    {
      internalType: "address payable",
      name: "sender",
      type: "address",
    },
    {
      internalType: "uint256",
      name: "amountIn",
      type: "uint256",
    },
    {
      internalType: "uint256",
      name: "minRate",
      type: "uint256",
    },
  ],
  name: "pull",
  outputs: [],
  stateMutability: "nonpayable",
  type: "function",
};

app.get("/", async function (req: Request, res: Response) {
  const wallet = new SimpleWallet();
  // add account by importing private key
  wallet.import(WALLET_PRIVATE_KEY);

  const driver = await Driver.connect(
    new SimpleNet("https://testnet.veblocks.net"),
    wallet
  );

  const connex = new Framework(driver);

  // res.send("Express + TypeScript Server");
  const pullMethod = connex.thor
    .account(GREETER_CONTRACT_ADDRESS)
    .method(pullABI);

  // Connex author's address and amount in wei
  const energyClause = pullMethod.asClause(
    TARGET_USER_ADDRESS,
    // `10${new Array(18).fill(0).join("")}`
    "10000000000000000000", // 10 VTHO
    "9999999999999999999"
  );

  const result = await connex.vendor
    .sign("tx", [
      // {
      //   to: "0xd3ae78222beadb038203be21ed5ce7c9b1bff602",
      //   value: "100000000000000000000",
      //   data: "0x",
      //   comment: "Transfer 100 VET",
      // },
      {
        // comment: "Allow Expo to spend your VTHO",
        ...energyClause,
      },
    ])
    // .signer($wallet.account) // Enforce signer
    // .gas(200000) // Set maximum gas
    // .link("https://connex.vecha.in/{txid}") // User will be back to the app by the url https://connex.vecha.in/0xffff....
    // .comment("Allow Expo to spend your VTHO")
    .request();

  console.log(result);

  res.send("OK");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  // console.log(`⚡️[server]: Get token data: http://localhost:${port}/token`);
  // console.log(`⚡️[server]: Get dex data: http://localhost:${port}/dex`);
});
