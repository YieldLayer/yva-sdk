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

  describe("latestAPY", () => {
    it("should fetch latest APY", async () => {
      const apy = await sdk.vault.latestAPY();

      console.log(`✅ Current APY: ${apy}%`);
    });
  });

  describe("deposit", () => {
    it("should deposit AVAX", async () => {
      console.log("depositing AVAX");
      const balance = await provider.getBalance(wallet.address);
      console.log("wallet balance:", ethers.utils.formatEther(balance));

      const tx = await sdk.vault.deposit(BigInt(1e18));
      console.log("Deposit transaction:", tx.transactionHash);
    });
  });
});
