// returns (
//   address owner,
//   string memory name,
//   uint256 rewardThreshold,
//   uint256 rewardAmount,
//   bool isActive
// )
export interface BusinessInfo {
  owner: string;
  name: string;
  rewardThreshold: string;
  rewardAmount: string;
  isActive: boolean;
  paymentAddress: string;
  businessContext: string;
}

export interface CreateBusinessPayload {
  name: string;
  rewardThreshold: string;
  rewardAmount: string;
  paymentAddress: string;
  businessContext: string;
}

export interface DemoBusinessData extends CreateBusinessPayload {
  businessContext: string;
}

export enum BusinessCommand {
  checkRewards = 'checkRewards',
  makePayment = 'makePayment',
  claimRewards = 'claimRewards',
}

export interface ChatResponse {
  command?: BusinessCommand;
  amount?: string;
  message: string;
}

export const BusinessCommands = [
  {
    command: BusinessCommand.makePayment,
    regex: /(\d+\.?\d*)/,
    keywords: ['pay', 'purchase', 'buy', 'spend']
  },
  {
    command: BusinessCommand.checkRewards,
    keywords: ['check', 'balance', 'points', 'rewards']
  },
  {
    command: BusinessCommand.claimRewards,
    keywords: ['claim', 'redeem', 'use']
  }
];
