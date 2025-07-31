import { Contract, providers, Signer, ethers } from "ethers";
import { YVA_CONFIG, Environment } from "./config";
import YVA_ABI from "./abis/YVA.json";
import { VaultModule } from "./modules/Vault";
import { UsersModule } from "./modules/Users";
import { BackendService } from "./services/BackendService";

export class YvaSDK {
  public vault: VaultModule;
  public users: UsersModule;

  provider: providers.JsonRpcProvider | providers.Web3Provider;
  contract: Contract;

  constructor(
    provider?: providers.JsonRpcProvider | providers.Web3Provider,
    signer?: Signer,
    env: Environment = "mainnet"
  ) {
    const { rpcUrl, contractAddress, backendUrl } = YVA_CONFIG[env];

    this.provider = provider || new providers.JsonRpcProvider(rpcUrl);
    this.contract = new ethers.Contract(
      contractAddress,
      YVA_ABI,
      this.provider
    );

    if (signer) {
      this.contract = this.contract.connect(signer);
    }

    const backend = new BackendService(backendUrl);
    this.vault = new VaultModule(backend, this.contract, signer);
    this.users = new UsersModule(backend, this.contract);
  }
}
