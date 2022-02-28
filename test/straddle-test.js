
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

const { deploy, getOwnerOther } = require("../scripts/lib");

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
        console.log("OwnerBalance", ownerBalance);
    });
});

describe("Token Transfer Test", function() {
    beforeEach(async function() {
        straddle = await deploy();
        [owner, other] = await getOwnerOther();
    });

    it("should transfer 1 million tokens from owner to other", async function() {
        await straddle.transfer(other.address, 1000000); // 1,000,000
        expect(await straddle.balanceOf(other.address)).to.equal(1000000);
    });

    it("should deposit from other should create locks tier-0, tier-1", async function() {
        await straddle.transfer(other.address, 1000000); // 1,000,000
        expect(await straddle.balanceOf(other.address)).to.equal(1000000);

        await straddle.connect(other).deposit(1000000, 0);

        // Balance of user is now 0, and contract has their previous balance.
        expect(await straddle.balanceOf(other.address)).to.equal(0);
        expect(await straddle.balanceOf(straddle.address)).to.equal(1000000);

        // Check the locks of the user
        let locksOfUser = await straddle.getUsersLocks(other.address);
        assert(locksOfUser.length == 1);
        print("Deposit created expected tier 0 lock.");
        assert(locksOfUser[0].stakedAmount == 1000000);
        assert(locksOfUser[0].tier == 0);

        assert(await straddle.getUserLockedBalance(other.address) == 0);
        assert(await straddle.getUserDepositBalance(other.address) == 1000000);

        // Trying to lock a million and 1 fails, only a million tokens have been deposited.
        await expect(straddle.connect(other).createLock(1000001, 1)).to.be.revertedWith("attempted lock amount exceeds deposits available for locking");

        await straddle.connect(other).createLock(500000, 1);

        assert((await straddle.getUsersLocks(other.address)).length == 2);
    });

    // try withdraw locked assets (fail)
    it("should revert when trying to withdraw locked assets", async function() {
        await straddle.transfer(other.address, 1_000_000);
        await expect(straddle.connect(other).withdraw(1)).to.be.revertedWith("No funds to withdraw");

        await straddle.connect(other).deposit(1_000_000, 0); // deposit all
        await straddle.connect(other).withdraw(500_000); // withdraw half
        expect(await straddle.balanceOf(other.address)).to.equal(500_000); // balance half
        await expect(straddle.connect(other).withdraw(500_001)).to.be.revertedWith("Amount to withdraw exceeds available funds");

        await straddle.connect(other).createLock(500_000, 1); // lock half
        await expect(straddle.connect(other).withdraw(500_000)).to.be.revertedWith("No unlocked funds available to withdraw");
    });

    // tests to write:
    // - send a distribution and verify the rewards balance
    // - send more distributions
    // - collect rewards
    // - withdraw assets after they unlock
    // ...
});
