# YVA SDK

TypeScript SDK for YVA (Yelay Vault on Avalanche) - A DeFi vault protocol on the Avalanche network.

## Overview

The YVA SDK provides a simple and intuitive interface to interact with the Avalanche Fusion protocol, allowing developers to integrate vault operations, user management, and analytics into their applications.

## Features

- 🏦 **Vault Operations**: Deposit and redeem AVAX from the YVA vault
- 📊 **Analytics**: Get real-time APY data and vault metrics
- 👥 **User Management**: Access user positions and top stakers leaderboard
- 🌐 **Multi-Environment**: Support for mainnet and testnet
- 🔗 **Ethers.js Integration**: Built on top of ethers.js for seamless Web3 integration

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
const amount = ethers.utils.parseEther("1.0");
const tx = await sdk.vault.deposit(amount);
console.log("Deposit transaction:", tx.hash);
```

#### Redeem AVAX

```typescript
// Redeem 1 AVAX from the vault
const amount = ethers.utils.parseEther("1.0");
const tx = await sdk.vault.redeem(amount);
console.log("Redeem transaction:", tx.hash);
```

#### Get Latest APY

```typescript
// Get the current APY for the vault
const apy = await sdk.vault.latestAPY();
console.log("Current APY:", apy);
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
