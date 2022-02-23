
const { expect } = require("chai");
const { ethers } = require("hardhat");

const { deploy, getOwnerOther } = require("../scripts/lib");

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
        const result = await straddle.transfer(other.address, 1000000); // 1,000,000
        expect(await straddle.balanceOf(other.address)).to.equal(1000000);
    });

    it("should lock deposit from other", async function() {
        // const signers = await ethers.getSigners();
        // const [owner, other] = signers;

        const result = await straddle.deposit(1000000, 0);
        console.log(result);
    });
});
