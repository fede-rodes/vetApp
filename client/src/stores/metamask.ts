import { writable } from "svelte/store";
import { Connex } from "@vechain/connex";
import { Certificate } from "thor-devkit";
// import type { ExternalProvider } from "@ethersproject/providers";

// const injected = window.ethereum;

// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
function createStore() {
  const { subscribe, set } = writable<
    | {
        connex: Connex;
        account: Address;
      }
    | undefined
  >();

  return {
    subscribe,
    connect: async function (): Promise<void> {
      // if (!injected?.isMetaMask) {
      //   throw new Error("MetaMask is not installed.");
      // }

      // const accounts = (await injected.request({
      //   method: "eth_requestAccounts",
      // })) as Address[];

      // if (accounts.length === 0) {
      //   throw new Error("No accounts found.");
      // }

      const connex = new Connex({
        node: "https://testnet.veblocks.net/",
        network: "test",
        noExtension: true,
      });

      const message: Connex.Vendor.CertMessage = {
        purpose: "identification",
        payload: {
          type: "text",
          content: "Sign a certificate to prove your identity",
        },
      };

      const certResponse = await connex.vendor.sign("cert", message).request();

      const cert: Certificate = {
        purpose: message.purpose,
        payload: message.payload,
        domain: certResponse.annex.domain,
        timestamp: certResponse.annex.timestamp,
        signer: certResponse.annex.signer,
        signature: certResponse.signature,
      };

      console.log("Signed cert", cert);
      Certificate.verify(cert);
      console.log("Cert verified");

      // const clientDetails = client.thor.block().get();
      // setWalletClient(clientDetails);

      // const account = await connex.thor.account(accountAddress).get()

      set({
        connex,
        account: certResponse.annex.signer as Address,
      });
    },
    disconnect: function () {
      set(undefined);
    },
    // switchChain: async function (chainId: number): Promise<void> {
    //   if (!injected?.isMetaMask) {
    //     throw new Error("MetaMask is not installed.");
    //   }

    //   await injected.request({
    //     method: "wallet_switchEthereumChain",
    //     params: [{ chainId: `0x${chainId.toString(16)}` }],
    //   });
    // },
  };
}

export const metamask = createStore();

// if (injected?.isMetaMask) {
//   // Connect account on landing or reload
//   // const accounts = (await window.ethereum.request({
//   //   method: "eth_requestAccounts",
//   // })) as Address[];

//   // if (accounts.length > 0) {
//   //   metamask.connect();
//   // }

//   // Reconnect on accounts or network change
//   injected.on("accountsChanged", metamask.connect);
//   injected.on("chainChanged", metamask.connect);
//   injected.on("disconnect", metamask.disconnect);
// }
