import { ethers } from "ethers";

// Test configuration
export const TEST_CONFIG = {
  testnet: {
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    contractAddress: "0xDf90c6b47f09FB5319eDc92Ed178bD0599D07be5",
    backendUrl: "https://api.dev.yva.yelay.io",
  },
};

// Mock provider for testing
export const createMockProvider = () => {
  return new ethers.providers.JsonRpcProvider(TEST_CONFIG.testnet.rpcUrl);
};

// Mock wallet for testing (using a test private key)
export const createMockWallet = (provider: ethers.providers.Provider) => {
  // This is a test private key - never use for real funds!
  const testPrivateKey =
    "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
  return new ethers.Wallet(testPrivateKey, provider);
};
