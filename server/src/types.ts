declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      WALLET_PRIVATE_KEY: string;
      GREETER_CONTRACT_ADDRESS: string;
      VTHO_CONTRACT_ADDRESS: string;
    }
  }
}

export {};
