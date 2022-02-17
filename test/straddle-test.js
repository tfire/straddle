
const { expect } = require("chai");

describe("Token Contract", function() {
    it("Deployment should assign 10,000,000 tokens (total supply) to owner", async function() { 
        const [owner] = await ethers.getSigners();

        const StraddleFactory = await ethers.getContractFactory("Straddle");
        const straddle = await StraddleFactory.deploy();
        const ownerBalance = await straddle.balanceOf(owner.address);
        expect(await straddle.totalSupply()).to.equal(ownerBalance);
        console.log("OwnerBalance", ownerBalance);
    });
});
