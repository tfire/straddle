const { ethers } = require("hardhat");
const hre = require("hardhat");

// Use the big crypto.com holdings address as a source of funds, like ETH and USDC.
const CRYPTO_DOT_COM = "0x6262998ced04146fa42253a5c0af90ca02dfd2a3";

const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const USDC_DECIMAL = 10 ** 6;

async function getOwnerOther() {
    const signers = await ethers.getSigners();
    const [owner, other, other2] = signers;
    return [owner, other, other2];
}

async function getUsdcContract(signer) {
    return new ethers.Contract(
        USDC_ADDRESS,
        [
            "function balanceOf(address _owner) public view returns (uint256 balance)",
            "function transfer(address _to, uint256 _value) public returns (bool success)",
            "function approve(address spender, uint256 amount) public returns (bool success)"
        ],
        signer
    );
}

async function distributeTenThousandUsdc() {
    const usdc = await getUsdcContract(signer=owner);
    await usdc.approve(straddle.address, ethers.utils.parseEther("1"));
    await straddle.depositRewards(ethers.BigNumber.from(10_000).mul(USDC_DECIMAL));
    await straddle.distributeRewards();
}

async function setupFunds() {
    /**
     * Sends 1 ETH to owner and other.
     *
     * Sends 1,000,000 USDC to owner (for distribution testing).
     */
    const [owner, other, other2] = await getOwnerOther();
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [CRYPTO_DOT_COM],
    });
    const signer = await ethers.getSigner(CRYPTO_DOT_COM);

    await signer.sendTransaction({
        to: owner.address,
        value: ethers.utils.parseEther("1")
    });

    await signer.sendTransaction({
        to: other.address,
        value: ethers.utils.parseEther("1")
    });

    const usdc = await getUsdcContract(signer);

    // USDC has 6 decimals. This ends up being a $100,000 transfer.
    const usdcAmount = ethers.BigNumber.from(100_000).mul(USDC_DECIMAL)
    await usdc.transfer(owner.address, usdcAmount);
}

async function deploy() {
    const StraddleFactory = await ethers.getContractFactory("Straddle");
    const straddle = await StraddleFactory.deploy();

    return straddle;

    // useful syntax when deployment includes multiple contracts:
    // return [straddle, otherDeployment];
    // unpacked on the receiving end like so:
    // const [straddle, other] = await deploy()
}

module.exports = {
    deploy,
    getOwnerOther,
    setupFunds,
    getUsdcContract,
    distributeTenThousandUsdc,
    USDC_DECIMAL
};

