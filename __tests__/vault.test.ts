import { YvaSDK } from "../src/YvaSDK";
import { ethers } from "ethers";
import { createMockProvider, createMockWallet } from "./setup";

describe("Vault Module", () => {
  let sdk: YvaSDK;
  let provider: ethers.providers.JsonRpcProvider;
  let wallet: ethers.Wallet;

  beforeAll(() => {
    provider = createMockProvider();
    wallet = createMockWallet(provider);
    sdk = new YvaSDK(provider, wallet, "testnet");
  });

  describe("APY Functionality", () => {
    it("should fetch latest APY", async () => {
      const apy = await sdk.vault.latestAPY();

      console.log(`✅ Current APY: ${apy}%`);
    });
  });
});
