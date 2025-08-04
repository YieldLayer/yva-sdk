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

  describe("stakingInfo", () => {
    it("should fetch staking information", async () => {
      const stakingInfo = await sdk.vault.stakingInfo();

      console.log(`✅ Total Staked: ${stakingInfo.totalStaked}`);
      console.log(`✅ Last Round APY: ${stakingInfo.lastRoundAPY}%`);
      console.log(
        `✅ Next Round Start: ${new Date(
          stakingInfo.nextRoundStart
        ).toISOString()}`
      );
    });
  });

  describe("deposit", () => {
    it("should deposit AVAX", async () => {
      console.log("depositing AVAX");
      const balance = await provider.getBalance(wallet.address);
      console.log("wallet balance:", ethers.utils.formatEther(balance));

      const txReceipt = await sdk.vault.deposit(BigInt(1e18));
      console.log("Deposit transaction:", txReceipt.transactionHash);
    });
  });

  describe("redeem", () => {
    it("should redeem AVAX", async () => {
      console.log("redeeming AVAX");
      const balance = await provider.getBalance(wallet.address);
      console.log("wallet balance:", ethers.utils.formatEther(balance));

      const txReceipt = await sdk.vault.redeem(BigInt(5e17)); // 0.5 AVAX
      console.log("Redeem transaction:", txReceipt.transactionHash);
    });
  });
});
