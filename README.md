# YVA SDK

TypeScript SDK for YVA (Yelay Vault on Avalanche) - A DeFi vault protocol on the Avalanche network.

## Overview

The YVA SDK provides a simple and intuitive interface to interact with the Avalanche Fusion protocol, allowing developers to integrate vault operations, user management, and analytics into their applications.

## Installation

```bash
npm install @yelay-lite/yva-sdk
# or
pnpm add @yelay-lite/yva-sdk
# or
yarn add @yelay-lite/yva-sdk
```

## Quick Start

### Basic Setup

```typescript
import { YvaSDK } from "@yelay-lite/yva-sdk";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const sdk = new YvaSDK(provider, signer);
```

### Environment Configuration

The SDK supports two environments:

- `mainnet`: Production Avalanche network
- `testnet`: Avalanche testnet (Fuji)

```typescript
// Mainnet (default)
const mainnetSDK = new YvaSDK(provider, signer, "mainnet");

// Testnet
const testnetSDK = new YvaSDK(provider, signer, "testnet");
```

## API Reference

### Vault Operations

#### Deposit AVAX

```typescript
// Deposit 1 AVAX to the vault
const amount = BigInt(1e18); // 1 AVAX in wei
const txReceipt = await sdk.vault.deposit(amount);
console.log("Deposit transaction:", txReceipt.transactionHash);
```

#### Redeem AVAX

```typescript
// Redeem 1 AVAX from the vault
const amount = BigInt(1e18); // 1 AVAX in wei
const txReceipt = await sdk.vault.redeem(amount);
console.log("Redeem transaction:", txReceipt.transactionHash);
```

#### Get Staking Information

```typescript
// Get comprehensive staking information including APY
const stakingInfo = await sdk.vault.stakingInfo();
console.log("Total Staked:", stakingInfo.totalStaked);
console.log("Last Round APY:", stakingInfo.lastRoundAPY);
console.log("Next Round Start:", new Date(stakingInfo.nextRoundStart));
```

### User Analytics

#### Get Top Stakers

```typescript
// Get top 10 stakers (default)
const topStakers = await sdk.users.topStakers();
console.log("Top stakers:", topStakers);

// Get top 5 stakers
const top5 = await sdk.users.topStakers(5);
console.log("Top 5 stakers:", top5);

// Each staker object contains:
// {
//   vault: string,
//   userId: string,
//   round: number,
//   position: string
// }
```

#### Get User Information

```typescript
// Get specific user's position and pending transactions
const userAddress = "0x1234567890123456789012345678901234567890";
const user = await sdk.users.getUser(userAddress);
console.log("User position:", user.position);
console.log("Pending deposit:", user.pending.deposit);
console.log("Pending redeem:", user.pending.redeem);

// User object structure:
// {
//   userAddress: string,
//   position: string,
//   pending: {
//     deposit: string,
//     redeem: string
//   }
// }
```

## Requirements

- Node.js 16+
- ethers.js v5
- TypeScript 5.4+ (for development)

## Development

```bash
# Install dependencies
pnpm install

# Build the SDK
pnpm run build

# Run linting
pnpm run lint
```

## Support

For questions and support, please visit our [GitHub repository](https://github.com/yelay-lite/yva-sdk) or contact the Yelay team.

---

**Disclaimer**: This SDK is for interacting with the Avalanche Fusion protocol. Please ensure you understand the risks involved with DeFi protocols before using this software.
