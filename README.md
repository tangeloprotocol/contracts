# How it works

β’Β We lend at the floor price of an NFT collection. By doing this, we can extend loans more widely and create a unified liquidity pool for lending. 
β’Β There are 4 key events in our contract.

1. Deposit - lend ether to the vault 
1. Withdraw - withdraw ether plus gains / losses
1. Take Loan - deposit an NFT and get a loan in return
1. Repay Loan - repay a loan, with interest.

# Open questions

- Currently a vault manager will need to call whitelistCollection to change a parameter like the lending price for an NFT collection. Is the current setup gas inefficient?
- What vectors for abuse am I not thinking about? 
- Can large whale deposits be used to take gains and subsequantly remove liquidity and abuse the system?
- Can re-entrancy attacks be used in takeLoan or withdrawFunds?


# TODO
- Clarify when vaultBalance and vaultBalanceAvailable should be adjusted. 
- Add more tests

# Built with  π Scaffold-ETH

> everything you need to build on Ethereum! π

π§ͺ Quickly experiment with Solidity using a frontend that adapts to your smart contract:

![image](https://user-images.githubusercontent.com/2653167/124158108-c14ca380-da56-11eb-967e-69cde37ca8eb.png)


# πββοΈ Quick Start

Prerequisites: [Node](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork π scaffold-eth:

```bash
git clone https://github.com/austintgriffith/scaffold-eth.git
```

> install and start your π·β Hardhat chain:

```bash
cd scaffold-eth
yarn install
yarn chain
```

> in a second terminal window, start your π± frontend:

```bash
cd scaffold-eth
yarn start
```

> in a third terminal window, π° deploy your contract:

```bash
cd scaffold-eth
yarn deploy
```

π Edit the smart contract `Tangelo.sol` in `packages/hardhat/contracts`
π Edit your frontend `App.jsx` in `packages/react-app/src`
πΌ Edit your deployment scripts in `packages/hardhat/deploy`
π± Open http://localhost:3000 to see the app

# π Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)
