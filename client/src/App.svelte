<script lang="ts">
  import { onMount } from "svelte";
  import { Connex } from "@vechain/connex";
  // import Big from "big.js";
  import { wallet } from "@/stores/wallet";
  import { Layout } from "@/components/layout";
  import { Button } from "@/components/button";
  import { ConnectWalletButton } from "@/components/connect-wallet-button";
  import { chain } from "./config";

  const VTHO_CONTRACT_ADDRESS = import.meta.env.VITE_VTHO_CONTRACT_ADDRESS;
  const GREETER_CONTRACT_ADDRESS = import.meta.env
    .VITE_GREETER_CONTRACT_ADDRESS;

  // TODO: either do this or call totalSupply
  // export const MAX_UINT256 = new Big(2).pow(256).sub(1);

  // See: https://blog.vechain.energy/how-to-swap-tokens-in-a-contract-c82082024aed

  // TODO
  // let ethers: any;
  // let Greeter: any;
  let greet = "";
  let newGreeting = "";
  let disabled = false;
  let error = "";

  async function handleApprove(): Promise<void> {
    if (VTHO_CONTRACT_ADDRESS == null) {
      throw new Error("Missing env var VITE_VTHO_CONTRACT_ADDRESS");
    }
    if (GREETER_CONTRACT_ADDRESS == null) {
      throw new Error("Missing env var GREETER_CONTRACT_ADDRESS");
    }
    if ($wallet.account == null) {
      throw new Error("Wallet is not connected");
    }

    const connex = new Connex({
      node: "https://testnet.veblocks.net/",
      network: "test",
      noExtension: true,
    });

    const totalSupplyABI = {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    };

    const totalSupply = await connex.thor
      .account(VTHO_CONTRACT_ADDRESS)
      .method(totalSupplyABI)
      .call();

    console.log({ totalSupply });

    // Prepare energy approve clause
    const approveABI = {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    };

    const approveMethod = connex.thor
      .account(VTHO_CONTRACT_ADDRESS)
      .method(approveABI);

    // Connex author's address and amount in wei
    const energyClause = approveMethod.asClause(
      GREETER_CONTRACT_ADDRESS,
      // MAX_UINT256.toString()
      totalSupply.decoded[0]
    );

    connex.vendor
      .sign("tx", [
        // {
        //   to: "0xd3ae78222beadb038203be21ed5ce7c9b1bff602",
        //   value: "100000000000000000000",
        //   data: "0x",
        //   comment: "Transfer 100 VET",
        // },
        {
          comment: "Allow Expo to spend your VTHO",
          ...energyClause,
        },
      ])
      .signer($wallet.account) // Enforce signer
      // .gas(200000) // Set maximum gas
      // .link("https://connex.vecha.in/{txid}") // User will be back to the app by the url https://connex.vecha.in/0xffff....
      .comment("Allow Expo to spend your VTHO")
      .request()
      .then((result) => {
        console.log(result);
      });
  }

  // async function getGreeting() {
  //   if (ethers == null) return;

  //   error = "";

  //   try {
  //     const provider = new ethers.providers.JsonRpcProvider(chain.rpc[0]);
  //     const greeter = new Greeter(provider);

  //     greet = await greeter.greet_();
  //   } catch (error_: any) {
  //     error = error_?.message || "Something went wrong when querying greeting";
  //   }
  // }

  // async function handleSubmit() {
  //   if ($wallet.provider == null || Greeter == null) return;

  //   disabled = true;
  //   error = "";

  //   try {
  //     const signer = $wallet.provider.getSigner();
  //     const greeter = new Greeter(signer);

  //     await greeter.setGreeting_(newGreeting);
  //     await getGreeting();
  //   } catch (error_: any) {
  //     error =
  //       error_?.message || "Something went wrong when setting a new greeting";
  //   } finally {
  //     disabled = false;
  //   }
  // }

  // async function handleSwitch() {
  //   error = "";

  //   try {
  //     await wallet.switchChain(chain.chainId);
  //   } catch (error_: any) {
  //     error = error_?.message || "Something went wrong when switching chains";
  //   }
  // }

  // onMount(async () => {
  //   // Lazy load ethers
  //   ethers = (await import("ethers")).ethers;
  //   Greeter = (await import("@/contracts/greeter")).Greeter;
  //   await getGreeting();
  // });
</script>

<Layout>
  <!-- <h3 class="text-center">
    Greeter.sol says: &ldquo;{greet}&rdquo;
  </h3>

  <form
    class="flex flex-col space-y-3 my-8"
    on:submit|preventDefault={handleSubmit}
  >
    <input
      type="text"
      id="greeting"
      bind:value={newGreeting}
      placeholder="Enter a new greeting..."
      required
      disabled={!$wallet.isConnected || $wallet.chainId != chain.chainId}
    /> -->

  <!-- {#if $wallet.isConnected && $wallet.chainId !== chain.chainId} -->
  <!-- <Button intent="danger" on:click={handleSwitch}>Wrong network</Button> -->
  <!-- {:else if $wallet.isConnected} -->
  {#if $wallet.isConnected}
    <Button intent="primary" {disabled} on:click={handleApprove}>
      Allow Expo to spend your VTHO
    </Button>
  {:else}
    <ConnectWalletButton intent="primary" />
  {/if}

  {#if error != null && error.length > 0}
    <p class="text-danger">{error}</p>
  {/if}
  <!-- </form> -->

  <p class="text-center">Chain: {chain.name}</p>
</Layout>
