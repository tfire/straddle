# Straddle

Here we are using the following:

Github Actions + Hardhat + Alchemy = Instant CI with Mainnet Forking

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

Pro tip:
```
vim ~/.zshrc

alias hardhat="npx hardhat"
alias hh="hardhat"
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
