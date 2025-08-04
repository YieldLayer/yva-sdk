import { YvaSDK } from "../src/YvaSDK";
import { ethers } from "ethers";
import { createMockProvider } from "./setup";

describe("Users Module", () => {
  let sdk: YvaSDK;
  let provider: ethers.providers.JsonRpcProvider;

  beforeAll(() => {
    provider = createMockProvider();
    sdk = new YvaSDK(provider, undefined, "testnet");
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

    it("should fetch user information", async () => {
      // Use a test address
      const testAddress = "0xeac3d7a54623f5a6e25bafd210075974d49c05f8";

      const user = await sdk.users.getUser(testAddress);

      console.log(`✅ User: ${JSON.stringify(user)}`);
    });
  });
});
