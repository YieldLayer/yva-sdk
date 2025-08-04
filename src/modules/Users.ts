import { Contract } from "ethers";
import { BackendService } from "../services/BackendService";

export class UsersModule {
  private backendService: BackendService;
  private contract: Contract;

  constructor(backendService: BackendService, contract: Contract) {
    this.backendService = backendService;
    this.contract = contract;
  }

  async getUser(userAddress: string) {
    return await this.backendService.getUser(userAddress);
  }

  async topStakers(limit: number = 10) {
    return await this.backendService.getTopStakers(limit);
  }
}
