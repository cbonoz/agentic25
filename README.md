<p align='center'>
  <img src="https://i.ibb.co/SXpVzYXJ/stamp-x.png"/>
</p>

# StampX

A Web3 Loyalty Program Platform with agent-driven contract interactions.

Built for Agentic Ethereum 2025.

Video demo: https://youtu.be/Z2Tf2YFsfCs

Live Demo Url: https://stampx.vercel.app (Base Sepolia)

Example Storefront chat: https://stampx.vercel.app/checkout/0x47a66666899c9ed775e5b1942c435d4e95ca445940468975d583d050a23ae8ef

This is on Base sepolia. Connect your wallet and ask this storefront anything!

## Inspiration

We wanted to revolutionize traditional loyalty programs by bringing them to Web3. Many small businesses struggle with customer retention and implementing reward systems, while customers juggle multiple loyalty cards and points systems. We saw an opportunity to solve this with blockchain technology.

QR Code (would be printed and displayed in the store): https://stampx.vercel.app/qr/0x47a66666899c9ed775e5b1942c435d4e95ca445940468975d583d050a23ae8ef

<!-- Demo

* Punch cards
* Create an app that could integrate at point of sale
* Login (uses coinbase SDK and smart wallets).
* Enable agents to reduce friction with interfacing with businesses and submitting crypto payments
* Each store gets a unique hash and is registered on a smart contract (here, can access from the about page as well)
* Unique agent to your business with your prompt and language
* One wallet used across
* QR code and chat interface

 -->

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

1. <b>Coinbase Developer Platform</b>

   - AgentKit: Core of the checkout/loyalty experience. Used to build and deploy AI agents that can:
     - Process natural language store queries
     - Execute on-chain transactions
     - Check loyalty point balances
     - Verify reward eligibility
   - OnchainKit: Manages real-time blockchain data and UI components.
   - Coinbase SDK & Chrome Extension: Handles wallet connections with wagmi integration and coinbase connector from the sdk. AgentKit is used to trigger wallet workflows.

2. <b>Autonome</b>

   - Hosts our custom AgentKit deployment with:
     - Store-specific training data and context
     - Transaction capabilities
     - Points calculation logic
     - Reward validation rules
   - Endpoint: `https://autonome.alt.technology/stampx-ighkdb`
   - Used as the backend of the useChat hook and manages real-time chat state and context persistence
   - Handles concurrent user sessions and load balancing for separate customer interactions.

3. <b>Base</b>

   - Primary chain for smart contract deployment and loyalty tracking
   - Benefits:
     - Low transaction costs for payment sends accrual
     - Fast finality for instant rewards
     - EVM compatibility for tooling support
   - Sepolia Contract: https://sepolia.basescan.org/address/0x2412FfB59ce049A5792773dFf493ba8583E5dF50
   - Uses Base Sepolia testnet for development and testing
   - CDP connected with onchainkit in the UI

4. <b>Nethermind</b>
   - Main AI agent functionality for the commerce use case is powered by solidity contracts and is open source.
     - Smart contract event emission
     - Automated reward distribution and validation
     - Natural language processing for user queries
     - Transaction intent detection
   - Integrates with store-specific business logic
   - Handles multi-step transactions and account state

Base Sepolia smart contract for StampX: https://sepolia.basescan.org/address/0x2412FfB59ce049A5792773dFf493ba8583E5dF50

Project is open source, available here: https://github.com/cbonoz/agentic25

## Challenges We ran into

- Implementing secure point tracking on the blockchain
- Creating a seamless UX that bridges Web2 and Web3
- Handling real-time updates for transactions and points
- Optimizing smart contract gas costs

### Doing a StampX production deployment

The StampX project is currently deployed on the Base Sepolia testnet. For deployments or other chains, these could be some initial steps (not exhaustive):

1. Update .env
2. Update siteConfig in config.ts with production values (ex: Base vs. Base Sepolia)
3. Redeploy smart contract on Base
4. Redeploy agentkit with Base mainnet
5. Make new website deployment (uses nextjs)

## What's next for StampX

- Multi-chain support: Expand beyond Base to include other EVM-compatible chains like Ethereum mainnet, Polygon, and Arbitrum, allowing businesses to choose their preferred network.
- Production deployment: Launch on Base mainnet with a focus on onboarding small to medium-sized businesses in the food and retail sectors.
- Enhanced AI capabilities: Implement personalized recommendation systems that analyze customer purchase history and preferences to suggest relevant products and optimize reward strategies.
- Cross-business rewards: Enable businesses to form partnerships and allow customers to earn and redeem points across multiple participating merchants.

### Screenshots

#### Home Page

<p align='center'>
  <img src="./img/home.png" alt="Home Page"/>
</p>

#### About Page

<p align='center'>
  <img src="./img/about.png" alt="About Page"/>
</p>

#### Launching a new store via smart contract

<p align='center'>
  <img src="./img/deploy.png" alt="Deployment Process"/>
</p>

#### Store front created

<p align='center'>
  <img src="./img/created.png" alt="Deployment Process"/>
</p>

#### QR Code for Storefront

<p align='center'>
  <img src="./img/qr.png" alt="QR Code for Storefront"/>
</p>

#### AI Chat Interface (customer facing)

<p align='center'>
  <img src="./img/ask.png" alt="AI Chat Interface"/>
</p>

#### Smart Contract Interaction

<p align='center'>
  <img src="./img/contract.png" alt="Smart Contract Interaction"/>
</p>

#### Payment Process

<p align='center'>
  <img src="./img/pay.png" alt="Payment Process"/>
</p>

#### Example chat showing additional follow up questions

<p align='center'>
  <img src="./img/prompt2.png" alt="Questions"/>
</p>

#### Agent deployed on autonome

<p align='center'>
  <img src="./img/autonome.png" alt="Payment Process"/>
</p>
