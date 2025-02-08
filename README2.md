<p align='center'>
  <img src="./img/stamp_x.png"/>
</p>

# StampX

A Web3 Loyalty Program Platform with agent-driven contract interactions.

Built for Agentic Ethereum 2025.

## Inspiration

We wanted to revolutionize traditional loyalty programs by bringing them to Web3. Many small businesses struggle with customer retention and implementing reward systems, while customers juggle multiple loyalty cards and points systems. We saw an opportunity to solve this with blockchain technology.

## Example storefront

QR Code (would be printed and displayed in the store): http://localhost:3000/qr/0x47a66666899c9ed775e5b1942c435d4e95ca445940468975d583d050a23ae8ef

Storefront chat: http://localhost:3000/checkout/0x47a66666899c9ed775e5b1942c435d4e95ca445940468975d583d050a23ae8ef

## What it does

StampX is a decentralized loyalty program platform that allows businesses to:

- Create and manage their own loyalty programs on the blockchain
- Set custom reward thresholds and amounts
- Track customer transactions and points
- Integrate with an AI-powered chat interface for seamless customer interactions

Customers can:

- Earn points across multiple businesses with a single wallet
- View their points balance and rewards
- Interact with businesses through an AI chat interface
- Redeem rewards automatically through smart contracts

## Technologies used

1. <b>Coinbase Developer Platform</b>: SmartWallets, Agentkit, OnchainKit, Coinbase SDK, Coinbase extension and browser provider. Custom prompt fed into deployment on Autonome

2. <b>Autonome</b>: AgentKit deployment and hosting

3. <b>Base</b>: Entire project centers around the base blockchain and payments ecosystem. Integrated links to deployed solidity smart contracts

4. <b>Opsec</b>: Secure App deployment. https://cloudverse.opsec.computer/dashboard

Core:

- Frontend: Next.js, TailwindCSS, wagmi
- Smart Contracts: Solidity, Hardhat
- AI Integration: GPT-4 API for chat interactions
- Blockchain: Deployed on Ethereum testnet
- Authentication: Web3 wallet integration

## Challenges We ran into

- Implementing secure point tracking on the blockchain
- Creating a seamless UX that bridges Web2 and Web3
- Handling real-time updates for transactions and points
- Optimizing smart contract gas costs

### Doing a StampX production deployment

The StampX project is currently deployed on the Base Sepolia testnet. For production deployments (at your own discretion, these would be the next immediate steps):

1. Replace env
2. Update siteConfig in config.ts with production values
3. Redeploy smart contract on Base
4. Redeploy agentkit with Base mainnet
5. Make new website deployment (using nextj)

<!-- ## Accomplishments that we're proud of

- Built a fully functional Web3 loyalty platform
- Created an intuitive UI that hides blockchain complexity
- Developed flexible smart contracts for business customization
- Integrated AI for natural customer interactions

## What we learned

- Smart contract development and testing
- Web3 frontend integration
- AI API implementation -->
<!-- - Blockchain transaction management -->

## What's next for StampX

- Multi-chain support: Expand beyond Base to include other EVM-compatible chains like Ethereum mainnet, Polygon, and Arbitrum, allowing businesses to choose their preferred network.

- Production deployment: Launch on Base mainnet with a focus on onboarding small to medium-sized businesses in the food and retail sectors.

- Enhanced AI capabilities: Implement personalized recommendation systems that analyze customer purchase history and preferences to suggest relevant products and optimize reward strategies.

- Cross-business rewards: Enable businesses to form partnerships and allow customers to earn and redeem points across multiple participating merchants.
