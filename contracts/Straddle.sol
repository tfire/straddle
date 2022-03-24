
// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

contract Straddle is Context, Ownable, ERC20("Straddle", "STRAD") {
    using SafeMath for uint;

    // TODO: this will ultimately need to be multiplied by ERC20 decimals. 10**18 default.
    uint constant MAX_SUPPLY = 10_000_000; 

    // USDC: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
    IERC20 constant USDC = IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);

    // Tracks the deposited USDC pending the next round of reward distribution.
    uint public stagingPoolSizeUsdc;

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
    mapping(address => Lock[]) public userLocks;

    struct Account {
        // The total STRAD an account has in deposit.
        uint depositBalance;
        uint rewardsClaimed;
    }
    mapping(address => Account) public userAccounts;

    constructor() {
        _mint(msg.sender, MAX_SUPPLY);
    }

    function depositRewards(uint usdcAmount) public {
        // Requires ERC-20 approval
        USDC.transferFrom(msg.sender, address(this), usdcAmount);
        stagingPoolSizeUsdc += usdcAmount;
    }

    function withdrawSurplus(uint usdcAmount) public onlyOwner  {
        // Realized we will end up with a reward surplus in 
        // the contract of at minimum 10% of what is distributed.

        USDC.transfer(msg.sender, usdcAmount);
    }

    function distributeRewards() public onlyOwner {
        // The staked total is used to compute the rewards per user.
        // as to how the stakedTotal allows for correct reward distribution when it does not
        // take into account time-lock weights, let me explain:
        // - tier-0 locks get created upon deposit w/ or w/o an actual time component to the lock.
        // - tier-0 lock is just staking to the contract. withdrawable at any point.
        // - tier-0 results in 50% of the reward pool by stake weight against stakedTotal
        // - tier-2 lock results in additional 20% of reward pool by stake weight against stakedTotal
        // - therefore by separating the lock tiers & combining the reward rates,
        //     we don't have to weight the quotient of stake/stakedTotal.

        // Contract's STRAD balance ie. total deposited/staked/locked STRAD
        uint stakedTotal = balanceOf(address(this));

        // Add a distribution to the (immutable?) record of distributions
        distributions.push(Distribution(block.timestamp, stagingPoolSizeUsdc, stakedTotal));
        stagingPoolSizeUsdc = 0;
    }

    function deposit(uint amount, uint lock_tier) public {
        require(lock_tier <= 4, "Invalid Lock Tier.");

        // transfer here requires erc20 approval
        _transfer(msg.sender, address(this), amount);
        userAccounts[msg.sender].depositBalance += amount;

        // create a "lock" for the base reward (tier 0)
        // this is not time-locked but reflects a deposit/stake
        _lock(amount, 0);

        if (lock_tier > 0) {
            _lock(amount, lock_tier);
        }
    }

    function createLock(uint amount, uint tier) public {
        _lock(amount, tier);
    }

    function _lock(uint amount, uint lockTier) internal {
        uint deposited = getUserDepositBalance(msg.sender);
        uint locked = getUserLockedBalance(msg.sender);
        uint unlocked = deposited - locked;

        require(amount <= unlocked, "attempted lock amount exceeds deposits available for locking");

        uint unlock_at = block.timestamp + (lockTier * 12 weeks);
        Lock memory lock = Lock(block.timestamp, unlock_at, amount, lockTier);
        userLocks[msg.sender].push(lock);
    }

    function getDistributions() public view returns (Distribution[] memory) {
        return distributions;
    }

    function getUserLocks(address user) public view returns (Lock[] memory) {
        return userLocks[user];
    }

    function getUserDepositBalance(address user) public view returns (uint) {
        return userAccounts[user].depositBalance;
    }

    function _lockIsActive(Lock storage lock) internal view returns (bool) {
        if (block.timestamp < lock.endTime && lock.tier > 0) {
            return true;
        }
        return false;
    }

    function getUserLockedBalance(address user) public view returns (uint) {
        uint lockedBalance = 0;

        for (uint i; i < userLocks[user].length; i++) {
            Lock storage lock = userLocks[user][i];
            if (_lockIsActive(lock)) {
                lockedBalance += lock.stakedAmount;
            }
        }

        return lockedBalance;
    }

    function calculateRewards(address user) public view returns (uint) {
        uint totalReward = 0;
        for (uint i; i < userLocks[user].length; i++) {

            Lock memory lock = userLocks[user][i];
            uint totalDistributionsEmittedDuringThisLockPerStakedStrad = 0;

            for (uint j; j < distributions.length; j++) {
                Distribution memory distribution = distributions[j];

                if (
                    // If the Distribution occurred during this Lock's lifespan
                    (distribution.time >= lock.startTime && distribution.time <= lock.endTime)
                    // or if this Lock is a tier 0 lock
                    || (lock.tier == 0)
                ) {
                    // Sum the quotients of rewards distributed and total staked at distribution time
                    // for each distribution during the lock.
                    // This is the mathematical implementation of the concept in
                    // Scalable Reward Distribution on the Ethereum Blockchain; Botag, Boca, and Johnson (see /docs)
                    totalDistributionsEmittedDuringThisLockPerStakedStrad += (
                        distribution.rewardAmount / distribution.stakedTotal
                    );
                }
            }

            uint stakeAdjustedReward = lock.stakedAmount * totalDistributionsEmittedDuringThisLockPerStakedStrad;
            uint lockTierAdjustedReward;
            if (lock.tier == 0) {
                // Tier 0 gets 50% base reward share.
                lockTierAdjustedReward = stakeAdjustedReward.div(10).mul(5);
            } else {
                // Tier 1, 2, 3, 4 get an additional 10%, 20%, 30%, 40%, respectively
                lockTierAdjustedReward = stakeAdjustedReward.div(10).mul(lock.tier);
            }
            totalReward += lockTierAdjustedReward;
        }

        return totalReward - userAccounts[user].rewardsClaimed;
    }

    function withdraw(uint amount) public {
        uint deposited = getUserDepositBalance(msg.sender);
        uint locked = getUserLockedBalance(msg.sender);
        require(deposited > 0, "No STRAD available to withdraw");

        uint availableToWithdraw = deposited - locked;
        require(availableToWithdraw > 0, "No unlocked STRAD available to withdraw");
        require(availableToWithdraw >= amount, "Amount to withdraw exceeds available STRAD");

        // TODO: tier-0 cleanup
        // what this means is that the tier-0 lock balance needs to be reduced,
        // or the lock should be deleted altogether.
        // the problem is that 
        //                       "|| (lock.tier == 0)"
        // above will potentially disrupt expected values if lock.stakedAmount is not adjusted
        // and if we do not give tier-0 a pseudo-expiry of some kind.
        
        // simpler route is:

        // it could be of benefit to hold a single definite tier-0 lock per user which
        // has a stakedAmount that normally fluctuates over time with the staking of additional
        // token, with or without the creation of timelocks, as well as withdrawals.

        userAccounts[msg.sender].depositBalance -= amount;
        _transfer(address(this), msg.sender, amount);
    }

    function claimRewards() public {
        uint netReward = calculateRewards(msg.sender);
        require(netReward > 0, "No rewards to claim");

        userAccounts[msg.sender].rewardsClaimed += netReward;
        USDC.transfer(msg.sender, netReward);
    }
}
