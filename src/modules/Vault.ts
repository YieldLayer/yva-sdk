import { Contract, Signer, ethers } from "ethers";
import { BackendService } from "../services/BackendService";

export class VaultModule {
  private backendService: BackendService;
  private contract: Contract;
  private signer?: Signer;

  constructor(
    backendService: BackendService,
    contract: Contract,
    signer?: Signer
  ) {
    this.contract = signer ? contract.connect(signer) : contract;
    this.signer = signer;
    this.backendService = backendService;
  }

  async deposit(amount: bigint) {
    if (!this.signer) throw new Error("Signer required for deposit");

    const formattedAmount = ethers.utils.formatEther(amount);
    console.log(`deposit amount: ${formattedAmount}`);
    const tx = await this.contract.deposit({ value: amount });
    return tx.wait();
  }

  async redeem(amount: bigint) {
    if (!this.signer) throw new Error("Signer required for redeem");

    const formattedAmount = ethers.utils.formatEther(amount);
    console.log(`redeem amount: ${formattedAmount}`);
    const tx = await this.contract.redeem(amount);
    return tx.wait();
  }

  async stakingInfo() {
    return await this.backendService.getStakingInfo();
  }
}
