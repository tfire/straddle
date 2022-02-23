// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Straddle is Context, Ownable, ERC20("Straddle", "STRAD") {

    mapping(address => uint) private _depositBalance; // in STRAD

    mapping(address => uint) private _lockTime;
    mapping(address => uint) private _lockTier;

    struct RewardRound {
        uint roundEndTime;
        uint totalUsdc;
    }

    mapping(uint => RewardRound) private _rewardRounds;

    // TODO. Maybe, maybe not:
    mapping(address => mapping(uint => uint)) private _rewardsBalance; // in USDC
    // mapping(address => mapping(uint => bool)) public claimedRound;

    uint public totalSTRADDeposited;
    uint constant MAX_SUPPLY = 10000000;

    constructor() {
        _mint(msg.sender, MAX_SUPPLY);
    }

    // Straddle Implementation

    function deposit(uint amount, uint lock_tier) public {
        require(lock_tier <= 4, "Invalid Lock Tier.");

        // ERC20 Transfer of STRAD from user EOA to Straddle contract.
        // Requires an Approval transaction first.
        _transfer(_msgSender(), address(this), amount);

        // A lock tier of 0 means there is no timelock applied. (0 * 2 weeks == 0)
        _lockTime[_msgSender()] = block.timestamp + (lock_tier * 12 weeks);
        _lockTier[_msgSender()] = lock_tier;

        totalSTRADDeposited += amount;
    }

    function withdraw() public {
        require(balanceOf(_msgSender()) > 0, "No funds deposited.");
        require(block.timestamp > _lockTime[msg.sender], "Deposit is still locked.");

        uint amount = _depositBalance[_msgSender()];
        _depositBalance[_msgSender()] = 0;

        transfer(_msgSender(), amount);

        totalSTRADDeposited -= amount;
    }

    function claimRewards(uint round) public {
        uint base = 5;
        uint bonus = _lockTier[_msgSender()];

        // USDC units are * 10 ^ 6
        // default ERC20 units are * 10^18

        uint roundTotalUsdc = _rewardRounds[round].totalUsdc;
        uint stradDeposited = _depositBalance[_msgSender()];
        
        // uint shareInPct = stradDeposited.div(MAX_SUPPLY);
        // uint shareInUsdc = roundTotalUSDC.div(10,000).mul(shareInBips);
        // uint rewardUSDC = roundTotalUSDC (base + bonus)

    }

    function rewardsBalance(address depositor, uint round) public view returns (uint) {
        // TODO. determine/finalize implementation approach for round by round
        // return _rewardRounds[round].totalUsdc;
        return _rewardsBalance[depositor][round];
    }

    function endRound() public onlyOwner {
        // After all various treasury accounts have transferred USDC rewards to the contract
        // owner can call endRound() to allow for the rewards to be claimed.
    }
}
