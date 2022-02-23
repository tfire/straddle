
async function getOwnerOther() {
    const signers = await ethers.getSigners();
    const [owner, other] = signers;
    return [owner, other];
}

async function deploy() {
    const StraddleFactory = await ethers.getContractFactory("Straddle2");
    const straddle = await StraddleFactory.deploy();

    return straddle;

    // useful syntax when deployment includes multiple contracts:
    // return [straddle, otherDeployment];
    // unpacked on the receiving end like so:
    // const [straddle, other] = await deploy() 
}

module.exports = { deploy, getOwnerOther };
