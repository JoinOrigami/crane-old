# The Origami family of smart contracts

## contract synopsis

| Contract                        | Purpose                                                        |
| :------------------------------ | :------------------------------------------------------------- |
| `OrigamiMembershipToken`        | A membership NFT issued to DAO members                         |
| `OrigamiMembershipTokenFactory` | A factory contract for cheaply deploying new membership tokens |
| `OrigamiGovernanceToken`        | An ERC20 token appropriate for use in governance               |
| `OrigamiGovernanceTokenFactory` | A factory contract for cheaply deploying new governance tokens |

## development

### Pre Requisites

Before running any command, you need to create a `.env` file and set a BIP-39
compatible mnemonic as an environment variable. Deploying will require setting, at a minimum, the `ALCHEMY_API_KEY`, though you'll likely want to populate one or more of the block explorer API keys as well.

Then, proceed with installing dependencies:

```sh
$ yarn install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### TypeChain

Compile the smart contracts and generate TypeChain artifacts:

```sh
$ yarn typechain
```

### Lint Solidity

Lint the Solidity code:

```sh
$ yarn lint:sol
```

### Lint TypeScript

Lint the TypeScript code:

```sh
$ yarn lint:ts
```

### Test

Run the Mocha tests:

```sh
$ yarn test
```

### Coverage

Generate the code coverage report:

```sh
$ yarn coverage
```

### Report Gas

See the gas usage per unit test and average gas per method call:

```sh
$ REPORT_GAS=true yarn test
```

### Clean

Delete the smart contract artifacts, the coverage reports and the Hardhat cache:

```sh
$ yarn clean
```
