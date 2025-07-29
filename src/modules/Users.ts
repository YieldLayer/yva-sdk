import { Contract } from "ethers";

export class UsersModule {
  private contract: Contract;

  constructor(contract: Contract) {
    this.contract = contract;
  }

  async position(userAddress: string) {
    return await this.contract.positionOf(userAddress);
  }

  async pending(userAddress: string) {
    return await this.contract.pending(userAddress);
  }

  async topStakers() {
    return await this.contract.getTopStakers();
  }
}
