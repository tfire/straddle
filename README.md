# Straddle Finance

Of interest:

- `contracts/Straddle.sol`

## Setup

```
npm install
```


Minimum necessary manual installations:
```
npm install --save-dev @openzeppelin/contracts
npm install --save-dev @nomiclabs/hardhat-waffle
npm install --save-dev chai

(possibly, if you get ERR_OSSL_EVP_UNSUPPORTED)

nvm install --lts
nvm use --lts
hardhat test
```

## Hardhat Sample

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
