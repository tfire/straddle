
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const {
    deploy,
    getOwnerOther,
    getUsdcContract,
    setupFunds,
    distributeTenThousandUsdc,
    USDC_DECIMAL
} = require("../scripts/lib");

const VERBOSE_LOGGING = true;

function print(arg) {
    if (VERBOSE_LOGGING) {
        console.log(arg);
    }
}

describe("Contract Deployment Test", function() {
    it("should deploy and assign 10,000,000 tokens to deployer", async function() {
        const [owner] = await ethers.getSigners();

        const StraddleFactory = await ethers.getContractFactory("Straddle");
        const straddle = await StraddleFactory.deploy();
        const ownerBalance = await straddle.balanceOf(owner.address);
        expect(await straddle.totalSupply()).to.equal(ownerBalance);
    });
});

describe("Main Suite", function() {
    setupFunds();

    beforeEach(async function() {
        straddle = await deploy();
        [owner, other, other2] = await getOwnerOther();
        usdc = await getUsdcContract(signer=owner);
    });

    it("should transfer 1 million tokens from owner to other", async function() {
        await straddle.transfer(other.address, 1_000_000); // 1,000,000
        expect(await straddle.balanceOf(other.address)).to.equal(1_000_000);
    });

    it("should deposit from address(other); should create tier-0, tier-1 locks", async function() {
        await straddle.transfer(other.address, 1_000_000); // 1,000,000
        expect(await straddle.balanceOf(other.address)).to.equal(1_000_000);

        await straddle.connect(other).deposit(1_000_000, 0);

        // Balance of user is now 0, and contract has their previous balance.
        expect(await straddle.balanceOf(other.address)).to.equal(0);
        expect(await straddle.balanceOf(straddle.address)).to.equal(1_000_000);

        // Check the locks of the user
        let locksOfUser = await straddle.getUserLocks(other.address);
        assert(locksOfUser.length == 1);
        assert(locksOfUser[0].stakedAmount == 1_000_000);
        assert(locksOfUser[0].tier == 0);

        assert(await straddle.getUserLockedBalance(other.address) == 0);
        assert(await straddle.getUserDepositBalance(other.address) == 1_000_000);

        // Trying to lock a million and 1 fails, only a million tokens have been deposited.
        await expect(straddle.connect(other).createLock(1_000_001, 1)).to.be.revertedWith("attempted lock amount exceeds deposits available for locking");

        await straddle.connect(other).createLock(500_000, 1);

        assert((await straddle.getUserLocks(other.address)).length == 2);
    });

    // try withdraw locked assets (fail)
    it("should revert when trying to withdraw locked assets", async function() {
        await straddle.transfer(other.address, 1_000_000);
        await expect(straddle.connect(other).withdraw(1)).to.be.revertedWith("No STRAD available to withdraw");

        await straddle.connect(other).deposit(1_000_000, 0); // deposit all
        await straddle.connect(other).withdraw(500_000); // withdraw half
        expect(await straddle.balanceOf(other.address)).to.equal(500_000); // balance half
        await expect(straddle.connect(other).withdraw(500_001)).to.be.revertedWith("Amount to withdraw exceeds available STRAD");

        await straddle.connect(other).createLock(400_000, 1); // lock more
        await expect(straddle.connect(other).withdraw(500_001)).to.be.revertedWith("Amount to withdraw exceeds available STRAD");
        await straddle.connect(other).withdraw(100_000); // withdraw all avaialble

        await expect(straddle.connect(other).withdraw(500_000)).to.be.revertedWith("No unlocked STRAD available to withdraw");
    });

    it("should create distributions", async function() {
        let distributions = await straddle.getDistributions();
        assert(distributions.length == 0, "distributions empty");

        await usdc.approve(straddle.address, ethers.utils.parseEther("1"));

        await straddle.depositRewards(ethers.BigNumber.from(10_000).mul(USDC_DECIMAL));
        assert(await straddle.stagingPoolSizeUsdc() == 10_000 * 1000000, "USDC staging pool correct");
        await straddle.distributeRewards();
        distributions = await straddle.getDistributions();
        assert(distributions.length == 1, "distribution created");
        assert(distributions[0].rewardAmount == 10_000 * 1000000, "distribution reward amount correct");
        assert(await usdc.balanceOf(straddle.address) == 10_000 * 1000000, "USDC balance correct");

        await straddle.depositRewards(ethers.BigNumber.from(10_000).mul(USDC_DECIMAL));
        assert(await straddle.stagingPoolSizeUsdc() == 10_000 * 1000000, "USDC staging pool correct");
        await straddle.distributeRewards();
        distributions = await straddle.getDistributions();
        assert(distributions.length == 2);
        assert(distributions[1].rewardAmount == 10_000 * USDC_DECIMAL);
        assert(await usdc.balanceOf(straddle.address) == 20_000 * USDC_DECIMAL);
    });

    // send a distribution and verify the rewards balance
    it("distributions and rewards", async function() {
        // other and other2 get half of all tokens
        // other, and other2 deposit all tokens with max lock
        await straddle.transfer(other.address, 5_000_000);
        await straddle.connect(other).deposit(5_000_000, 4);
        await straddle.transfer(other2.address, 5_000_000);
        await straddle.connect(other2).deposit(5_000_000, 4);

        // create a 10,000 usdc distribution
        const usdc = await getUsdcContract(signer=owner);
        await usdc.approve(straddle.address, ethers.utils.parseEther("1"));
        await straddle.depositRewards(ethers.BigNumber.from(10_000).mul(USDC_DECIMAL));
        await straddle.distributeRewards();

        // verify the rewards balance
        // other and other2 should recieve half of the distribution
        expect(await straddle.calculateRewards(other.address)).to.equal(4_500 * USDC_DECIMAL);
        expect(await straddle.calculateRewards(other2.address)).to.equal(4_500 * USDC_DECIMAL);
    });

    it("claim rewards", async function() {
        await straddle.transfer(other2.address, 5_000_000);
        await straddle.connect(other2).deposit(5_000_000, 4);

        await distributeTenThousandUsdc();

        // verify the rewards balance
        expect(await straddle.calculateRewards(other2.address)).to.equal(9_000 * USDC_DECIMAL);
        expect(await usdc.balanceOf(other2.address)).to.equal(0);

        // claim rewards
        await straddle.connect(other2).claimRewards();
        expect(await usdc.balanceOf(other2.address)).to.equal(9_000 * USDC_DECIMAL);

        // error if user has claimed all rewards
        expect(await straddle.calculateRewards(other2.address)).to.equal(0);
        await expect(straddle.connect(other2).claimRewards()).to.be.revertedWith("No rewards to claim");
    });

    // tests to write:
    // - send more distributions
    // - withdraw assets after they unlock
    // ...
});
