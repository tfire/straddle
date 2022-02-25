

// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Straddle is Context, Ownable, ERC20("Straddle", "STRAD") {

    uint constant YEAR_3000 = 32503680000;
    uint constant MAX_SUPPLY = 10000000;

    struct Distribution {
      uint time;
      uint rewardAmount;
      uint stakedTotal;
    }
    Distribution[] distributions;

    struct Lock {
      uint startTime;
      uint endTime;
      uint stakedAmount;
      uint tier; // 0 - 4
    }
    mapping(address => Lock[]) userLocks;

    struct Account {
        // The total STRAD an account has in deposit.
        uint depositBalance;
    }
    mapping(address => Account) userAccounts;

    constructor() {
        _mint(msg.sender, MAX_SUPPLY);
    }

    function deposit(uint amount, uint lock_tier) public {

        require(lock_tier <= 4, "Invalid Lock Tier.");

        // transfer here requires erc20 approval
        _transfer(_msgSender(), address(this), amount);

        // create a "lock" for the base reward (tier 0)
        // this is not time-locked but reflects a deposit
        _lock(amount, 0);

        if (lock_tier > 0) {
            _lock(amount, lock_tier);
        }
    }

    function createLock(uint amount, uint tier) public {
        _lock(amount, tier);
    }

    function _lock(uint amount, uint lockTier) internal {
        uint unlock_at = block.timestamp + (lockTier * 12 weeks);
        Lock memory lock = Lock(block.timestamp, unlock_at, amount, lockTier);
        userLocks[msg.sender].push(lock);
    }

    function getUsersLocks(address user) public view returns (Lock[] memory) {
        return userLocks[user];
    }

    function getUserDepositBalance(address user) public view returns (uint) {
        return userAccounts[user].depositBalance;
    }

    function calculateRewards(address user) public view returns (uint) {
        uint totalReward = 0;
        for (uint i = 0; i < userLocks[user].length; i++) {
            
            Lock memory lock = userLocks[user][i];
            uint totalDistributionsEmittedDuringThisLock = 0;

            for (uint j = 0; j < distributions.length; j++) {
                Distribution memory distribution = distributions[j];

                if (distribution.time >= lock.startTime && distribution.time <= lock.endTime) {
                    // Summing the quotients of rewards distributed and total staked at distribution
                    // for each distribution during the lock.
                    // This is the mathematical implementation of the concept in
                    // Scalable Reward Distribution on the Ethereum Blockchain; Botag, Boca, and Johnson
                    // https://uploads-ssl.webflow.com/5ad71ffeb79acc67c8bcdaba/5ad8d1193a40977462982470_scalable-reward-distribution-paper.pdf 
                    totalDistributionsEmittedDuringThisLock += distribution.rewardAmount / distribution.stakedTotal;
                }
            }

            totalReward += lock.stakedAmount * totalDistributionsEmittedDuringThisLock;
        }
        
        return totalReward;
    }
}
