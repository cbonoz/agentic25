
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
}

export enum BusinessCommand {
  checkRewards = 'checkRewards',
  makePayment = 'makePayment',
  claimRewards = 'claimRewards',
}
