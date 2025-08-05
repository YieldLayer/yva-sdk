import { YvaSDK } from "../src/YvaSDK";
import { ethers } from "ethers";
import { createMockProvider, createMockWallet } from "./setup";

describe("Users Module", () => {
  let sdk: YvaSDK;
  let sdkWithSigner: YvaSDK;
  let provider: ethers.providers.JsonRpcProvider;
  let signer: ethers.Wallet;

  beforeAll(() => {
    provider = createMockProvider();
    sdk = new YvaSDK(provider, undefined, "testnet");

    // Create a test wallet for testing user functionality
    signer = createMockWallet(provider);
    sdkWithSigner = new YvaSDK(provider, signer, "testnet");
  });

  describe("Top Stakers Functionality", () => {
    it("should fetch top stakers with default limit", async () => {
      const stakers = await sdk.users.topStakers();

      console.log(`✅ Found ${stakers.length} top stakers`);
      expect(Array.isArray(stakers)).toBe(true);

      if (stakers.length > 0) {
        stakers.slice(0, 3).forEach((staker, index) => {
          console.log(
            `  ${index + 1}. Vault: ${staker.vault}, User: ${
              staker.userId
            }, Round: ${staker.round}, Position: ${staker.position}`
          );

          // Validate staker structure
          expect(staker).toHaveProperty("vault");
          expect(staker).toHaveProperty("userId");
          expect(staker).toHaveProperty("round");
          expect(staker).toHaveProperty("position");
        });
      }
    });

    it("should fetch user information with connected wallet", async () => {
      console.log(`✅ User address: ${await signer.getAddress()}`);
      const user = await sdkWithSigner.users.getUser();
      console.log(`✅ User: ${JSON.stringify(user)}`);
    });
  });
});
