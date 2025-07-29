import { Contract, Signer } from "ethers";

export class VaultModule {
  private contract: Contract;
  private signer?: Signer;

  constructor(contract: Contract, signer?: Signer) {
    this.contract = signer ? contract.connect(signer) : contract;
    this.signer = signer;
  }

  async deposit(amount: string) {
    if (!this.signer) throw new Error("Signer required for deposit");
    console.log("deposit", amount);
    const tx = await this.contract.deposit({ value: amount });
    return tx.wait();
  }

  async withdraw(amount: string) {
    if (!this.signer) throw new Error("Signer required for withdraw");
    console.log("withdraw", amount);
    const tx = await this.contract.withdraw(amount);
    return tx.wait();
  }

  async latestAPY() {
    console.log("latestAPY");
  }
}
