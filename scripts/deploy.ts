import hre from "hardhat";
const {
  ethers: {
    BigNumber: { from: bn },
  },
  network: {
    config: {
      vthoAddr,
      // renTokenAddr,
      // darknodeRegistryAddr,
      // darknodePaymentAddr,
      // claimRewardsAddr,
      // gatewayAddr,
    },
  },
} = require("hardhat");

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  console.log("Deploying contract...");
  console.log(
    `Using network ${hre.network.name} (${hre.network.config.chainId})`
  );

  const signers = await hre.thor.getSigners();
  const admin = signers[0];
  console.log({ signers });

  const Greeter = await hre.thor.getContractFactory("Greeter");
  const greeter = await Greeter.connect(admin).deploy(vthoAddr);
  await greeter.deployed();

  console.log(`Greeter contract deployed to ${greeter.address}`);

  // if (["hardhat", "localhost"].includes(hre.network.name)) {
  //   console.log("Skipping contract's Etherscan verification");
  // } else {
  //   console.log("Waiting before verification");
  //   await sleep(30_000);
  //   console.log("Verifying contract on Etherscan");

  //   await hre
  //     .run("verify:verify", {
  //       address: greeter.address,
  //       constructorArguments: [greeting],
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
