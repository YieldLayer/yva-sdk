export interface APYResponse {
  apy: number;
}

export interface StakerInfo {
  vault: string;
  userId: string;
  round: number;
  position: string;
}

export interface TopStakersResponse {
  stakers: StakerInfo[];
  totalStakers: number;
}

export interface PositionResponse {
  userAddress: string;
  stakedAmount: string;
  pendingRewards: string;
  lastStakeTime: number;
}

export class BackendService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  }

  async getLatestAPY(): Promise<number> {
    try {
      const response = await fetch(`${this.baseUrl}/api/apy`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: APYResponse = await response.json();
      return data.apy;
    } catch (error) {
      console.error("Error fetching latest APY:", error);
      throw error;
    }
  }

  async getTopStakers(limit: number = 10): Promise<StakerInfo[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/stakers/top?limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: TopStakersResponse = await response.json();
      return data.stakers;
    } catch (error) {
      console.error("Error fetching top stakers:", error);
      throw error;
    }
  }

  async getUserPosition(userAddress: string): Promise<PositionResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/users/${userAddress}/position`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PositionResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user position:", error);
      throw error;
    }
  }

  async getUserPending(userAddress: string): Promise<string> {
    try {
      const position = await this.getUserPosition(userAddress);
      return position.pendingRewards;
    } catch (error) {
      console.error("Error fetching user pending rewards:", error);
      throw error;
    }
  }
}
