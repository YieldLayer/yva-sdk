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
      stakers.slice(0, 3).forEach((staker, index) => {
        console.log(
          `  ${index + 1}. Vault: ${staker.vault}, User: ${
            staker.userId
          }, Round: ${staker.round}, Position: ${staker.position}`
        );
      });
    });
  });
});
