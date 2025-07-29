import { Contract, providers, Signer, ethers } from "ethers";
import { YVA_CONFIG, Environment } from "./config";
import YVA_ABI from "./abis/YVA.json";
import { VaultModule } from "./modules/Vault";
import { UsersModule } from "./modules/Users";

export class YvaSDK {
  public vault: VaultModule;
  public users: UsersModule;

  provider: providers.JsonRpcProvider | providers.Web3Provider;
  signer?: Signer;
  contract: Contract;
  environment: Environment;

  constructor(
    provider?: providers.JsonRpcProvider | providers.Web3Provider,
    signer?: Signer,
    env: Environment = "mainnet"
  ) {
    this.environment = env;

    const { rpcUrl, contractAddress } = YVA_CONFIG[env];

    this.provider = provider || new providers.JsonRpcProvider(rpcUrl);
    this.contract = new ethers.Contract(
      contractAddress,
      YVA_ABI,
      this.provider
    );

    if (signer) {
      this.signer = signer;
      this.contract = this.contract.connect(this.signer);
    }

    this.vault = new VaultModule(this.contract, this.signer);
    this.users = new UsersModule(this.contract);
  }
}
