/*
* File contains wider range of test cases for rewards
*/

const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

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


describe("3. Advanced Reward Testing", function() {
    setupFunds();

    beforeEach(async function() {
        straddle = await deploy();
        [owner, other, other2] = await getOwnerOther();
        usdc = await getUsdcContract(signer=owner);
    });
    
    it("Tier 0 continues accruing after Lock expires", async function() {
        // User locks and a distribution is made during the lock
        // Lock expires and another distribution is made
        // Default/tier-0/staked rewards continue to accrue

        await straddle.transfer(other2.address, 5_000_000);
        await straddle.connect(other2).deposit(5_000_000, 1);
        await distributeTenThousandUsdc();
        expect(await straddle.calculateRewards(other2.address)).to.equal(6_000 * USDC_DECIMAL);

        const stake = (await straddle.getUserLocks(other2.address))[0];
        const lock = (await straddle.getUserLocks(other2.address))[1];

        // number of seconds in 1 week = 604,800 = 0x93a80
        // advance 13 blocks with 1 week between blocks (yes this is not very realistic)
        await hre.network.provider.send("hardhat_mine", ["0xd", "0x93a80"]);
        const latestBlock = await hre.ethers.provider.getBlock("latest")
        assert(lock.endTime < latestBlock.timestamp);
        
        await distributeTenThousandUsdc();
        expect(await straddle.calculateRewards(other2.address)).to.equal(11_000 * USDC_DECIMAL);
    });

    it("Single user locks again with same tier", async function() {
        await straddle.transfer(other2.address, 5_000_000);
        await straddle.connect(other2).deposit(5_000_000, 1);
        await distributeTenThousandUsdc();
        expect(await straddle.calculateRewards(other2.address)).to.equal(6_000 * USDC_DECIMAL);

        const stake = (await straddle.getUserLocks(other2.address))[0];
        const lock = (await straddle.getUserLocks(other2.address))[1];

        // number of seconds in 1 week = 604,800 = 0x93a80
        // advance 13 blocks with 1 week between blocks (yes this is not very realistic)
        await hre.network.provider.send("hardhat_mine", ["0xd", "0x93a80"]);
        const latestBlock = await hre.ethers.provider.getBlock("latest");
        assert(lock.endTime < latestBlock.timestamp);

        await distributeTenThousandUsdc();
        expect(await straddle.calculateRewards(other2.address)).to.equal(11_000 * USDC_DECIMAL);

        await straddle.connect(other2).createLock(5_000_000, 1);
        await distributeTenThousandUsdc();
        expect(await straddle.calculateRewards(other2.address)).to.equal(17_000 * USDC_DECIMAL);
    });

    it("Single user locks again with higher tier", async function() {
        await straddle.transfer(other2.address, 5_000_000);
        await straddle.connect(other2).deposit(5_000_000, 1);
        await distributeTenThousandUsdc();
        expect(await straddle.calculateRewards(other2.address)).to.equal(6_000 * USDC_DECIMAL);

        const stake = (await straddle.getUserLocks(other2.address))[0];
        const lock = (await straddle.getUserLocks(other2.address))[1];

        // number of seconds in 1 week = 604,800 = 0x93a80
        // advance 13 blocks with 1 week between blocks (yes this is not very realistic)
        await hre.network.provider.send("hardhat_mine", ["0xd", "0x93a80"]);
        const latestBlock = await hre.ethers.provider.getBlock("latest");
        assert(lock.endTime < latestBlock.timestamp);

        await distributeTenThousandUsdc();
        expect(await straddle.calculateRewards(other2.address)).to.equal(11_000 * USDC_DECIMAL);

        await straddle.connect(other2).createLock(5_000_000, 4);
        await distributeTenThousandUsdc();
        expect(await straddle.calculateRewards(other2.address)).to.equal(20_000 * USDC_DECIMAL);
    });

    it("Single user deposits and withdraws STRAD while distributions occur", async function() {
        // TODO
    });
});
