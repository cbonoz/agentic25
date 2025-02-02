// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract StampX {
    struct Business {
        address owner;
        string name;
        uint256 rewardThreshold;
        uint256 rewardAmount;
        bool isActive;
    }

    struct Transaction {
        address user;
        uint256 amount;
        uint256 timestamp;
    }

    // Business hash => Business details
    mapping(bytes32 => Business) public businesses;
    // Business hash => User address => Points balance
    mapping(bytes32 => mapping(address => uint256)) public userPoints;
    // Business hash => Transactions
    mapping(bytes32 => Transaction[]) public transactions;

    event BusinessRegistered(bytes32 indexed businessHash, string name, address owner);
    event PointsEarned(bytes32 indexed businessHash, address indexed user, uint256 points);
    event RewardClaimed(bytes32 indexed businessHash, address indexed user, uint256 amount);

    modifier onlyBusinessOwner(bytes32 businessHash) {
        require(businesses[businessHash].owner == msg.sender, "Not business owner");
        _;
    }

    function registerBusiness(
        bytes32 businessHash,
        string memory name,
        uint256 rewardThreshold,
        uint256 rewardAmount
    ) external {
        require(!businesses[businessHash].isActive, "Business already registered");

        businesses[businessHash] = Business({
            owner: msg.sender,
            name: name,
            rewardThreshold: rewardThreshold,
            rewardAmount: rewardAmount,
            isActive: true
        });

        emit BusinessRegistered(businessHash, name, msg.sender);
    }

    function recordTransaction(
        bytes32 businessHash,
        address user,
        uint256 amount
    ) external onlyBusinessOwner(businessHash) {
        require(businesses[businessHash].isActive, "Business not active");

        transactions[businessHash].push(Transaction({
            user: user,
            amount: amount,
            timestamp: block.timestamp
        }));

        // Add points
        userPoints[businessHash][user] += amount;
        emit PointsEarned(businessHash, user, amount);

        // Auto-claim reward if threshold reached
        if (userPoints[businessHash][user] >= businesses[businessHash].rewardThreshold) {
            _claimReward(businessHash, user);
        }
    }

    function _claimReward(bytes32 businessHash, address user) internal {
        Business storage business = businesses[businessHash];
        require(userPoints[businessHash][user] >= business.rewardThreshold, "Insufficient points");

        userPoints[businessHash][user] -= business.rewardThreshold;
        emit RewardClaimed(businessHash, user, business.rewardAmount);

        // In a real implementation, this would trigger a reward transfer
        // payable(user).transfer(business.rewardAmount);
    }

    function getPoints(bytes32 businessHash, address user) external view returns (uint256) {
        return userPoints[businessHash][user];
    }

    function getTransactionCount(bytes32 businessHash) external view returns (uint256) {
        return transactions[businessHash].length;
    }

    function updateRewardConfig(
        bytes32 businessHash,
        uint256 newThreshold,
        uint256 newAmount
    ) external onlyBusinessOwner(businessHash) {
        businesses[businessHash].rewardThreshold = newThreshold;
        businesses[businessHash].rewardAmount = newAmount;
    }

    function getBusinessInfo(bytes32 businessHash)
        external
        view
        returns (
            address owner,
            string memory name,
            uint256 rewardThreshold,
            uint256 rewardAmount,
            bool isActive
        )
    {
        Business storage business = businesses[businessHash];
        return (
            business.owner,
            business.name,
            business.rewardThreshold,
            business.rewardAmount,
            business.isActive
        );
    }
}
