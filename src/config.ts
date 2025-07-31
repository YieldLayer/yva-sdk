export type Environment = "mainnet" | "testnet";

export const YVA_CONFIG = {
  mainnet: {
    rpcUrl: "https://api.avax.network",
    contractAddress: "0xDf90c6b47f09FB5319eDc92Ed178bD0599D07be5", // TODO: replace with production
    backendUrl: "https://yva.yelay.io",
  },
  testnet: {
    rpcUrl: "https://api.avax-test.network",
    contractAddress: "0xDf90c6b47f09FB5319eDc92Ed178bD0599D07be5",
    backendUrl: "https://dev.yva.yelay.io",
  },
};
