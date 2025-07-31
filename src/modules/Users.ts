import { Contract } from "ethers";
import { BackendService } from "../services/BackendService";

export class UsersModule {
  private backendService: BackendService;
  private contract: Contract;

  constructor(backendService: BackendService, contract: Contract) {
    this.backendService = backendService;
    this.contract = contract;
  }

  // async position(userAddress: string) {
  //   try {
  //     return await this.backendService.getUserPosition(userAddress);
  //   } catch (error) {
  //     console.warn(
  //       "Failed to fetch position from backend, falling back to contract:",
  //       error
  //     );
  //     throw error;
  //   }
  // }

  // async pending(userAddress: string) {
  //   try {
  //     return await this.backendService.getUserPending(userAddress);
  //   } catch (error) {
  //     console.warn(
  //       "Failed to fetch pending rewards from backend, falling back to contract:",
  //       error
  //     );
  //     throw error;
  //   }
  // }

  async topStakers(limit: number = 10) {
    try {
      return await this.backendService.getTopStakers(limit);
    } catch (error) {
      console.warn(
        "Failed to fetch top stakers from backend, falling back to contract:",
        error
      );
      throw error;
    }
  }
}
