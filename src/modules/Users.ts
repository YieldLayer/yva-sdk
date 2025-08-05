import { Signer } from "ethers";
import { BackendService } from "../services/BackendService";

export class UsersModule {
  private backendService: BackendService;
  private signer?: Signer;

  constructor(backendService: BackendService, signer?: Signer) {
    this.backendService = backendService;
    this.signer = signer;
  }

  async getUser() {
    if (!this.signer) {
      throw new Error(
        "Signer is required to get user information. Please connect a wallet."
      );
    }

    const userAddress = await this.signer.getAddress();
    return await this.backendService.getUser(userAddress);
  }

  async topStakers(limit: number = 10) {
    return await this.backendService.getTopStakers(limit);
  }
}
