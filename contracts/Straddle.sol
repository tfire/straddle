pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Straddle is ERC20("Straddle", "STRAD"), Ownable {

    mapping(address => uint) private _rewardsBalance;

    struct RewardRound {
        uint roundEndTime;
        uint totalUsdcRewards;
    }

    mapping(uint => RewardRound) public rewardRounds;
    mapping(address => mapping(uint => bool)) public claimedRound;

    uint public totalSTRADDeposited;
    uint const MAX_SUPPLY = 10,000,000;

    constructor() {
        _mint(msg.sender, MAX_SUPPLY);
    }

    // Straddle Implementation

    function deposit(uint amount, uint lock_tier) public {
        require(lock_tier <= 4, "Invalid Lock Tier.");

        // ERC20 Transfer of STRAD from user EOA to Straddle contract.
        // Requires an Approval transaction first.
        _transfer(_msgSender(), this, amount);

        // A lock tier of 0 means there is no timelock applied. (0 * 2 weeks == 0)
        lockTime[_msgSender()] = block.timestamp + (lock_tier * 12 weeks);
        lockTier[_msgSender()] = lock_tier;

        totalSTRADDeposited += amount;
    }

    function withdraw() public {
        require(_balances[_msgSender()] > 0, "No funds deposited.");
        require(block.timestamp > lockTime[msg.sender], "Deposit is still locked.");

        uint amount = _balances[_msgSender()];
        _balances[_msgSender] = 0;

        transfer(_msgSender, amount);

        totalSTRADDeposited -= amount;
    }

    function claimRewards(uint round) public {
        uint base = 5;
        uint bonus = lockTier[_msgSender()];

        // USDC units are * 10 ^ 6
        // default ERC20 units are * 10^18

        uint roundTotalUsdc = rewardRounds[round].totalUsdc;
        uint stradDeposited = _balances[_msgSender()];
        uint shareInPct = stradDeposited.div(MAX_SUPPLY);

        
        // uint shareInUsdc = roundTotalUSDC.div(10,000).mul(shareInBips);
        // uint rewardUSDC = roundTotalUSDC (base + bonus)
    }

    function rewardsBalance(address depositor) public view {
        return _rewardsBalance[depositor];
    }

    function endRound() public onlyOwner {
        // After all various treasury accounts have transferred USDC rewards to the contract
        // owner can call endRound() to allow for the rewards to be claimed.
    }
}
