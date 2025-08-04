export interface StakerInfo {
  vault: string;
  userId: string;
  round: number;
  position: string;
}

export interface TopStakersResponse {
  users: StakerInfo[];
  totalStakers: number;
}

export interface UserResponse {
  userAddress: string;
  position: string;
  pending: {
    deposit: string;
    redeem: string;
  };
}

export interface StakingInfoResponse {
  totalStaked: string;
  lastRoundAPY: number;
  nextRoundStart: number;
}

export class BackendService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  }

  async getStakingInfo(): Promise<StakingInfoResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/staking`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: StakingInfoResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching staking info:", error);
      throw error;
    }
  }

  async getTopStakers(limit: number = 10): Promise<StakerInfo[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/users?limit=${limit}&orderBy=position&orderDirection=DESC`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: TopStakersResponse = await response.json();
      return data.users;
    } catch (error) {
      console.error("Error fetching top stakers:", error);
      throw error;
    }
  }

  async getUser(userAddress: string): Promise<UserResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/users/${userAddress}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: UserResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user position:", error);
      throw error;
    }
  }
}
