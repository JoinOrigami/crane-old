/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  OrigamiGovernanceTokenTestVersion,
  OrigamiGovernanceTokenTestVersionInterface,
} from "../../../contracts/versions/OrigamiGovernanceTokenTestVersion";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "burnable",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "disableBurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "disableTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "enableBurn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "enableTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_supplyCap",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isFromUpgrade",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "transferrable",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506200001c62000022565b62000152565b6200002e60ff62000031565b50565b60008054610100900460ff1615620000ca578160ff1660011480156200006a575062000068306200014360201b62000c7e1760201c565b155b620000c25760405162461bcd60e51b815260206004820152602e60248201526000805160206200233783398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b506000919050565b60005460ff808416911610620001295760405162461bcd60e51b815260206004820152602e60248201526000805160206200233783398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401620000b9565b506000805460ff191660ff92909216919091179055600190565b6001600160a01b03163b151590565b6121d580620001626000396000f3fe608060405234801561001057600080fd5b50600436106102415760003560e01c806342966c6811610145578063a217fddf116100bd578063d53913931161008c578063dd62ed3e11610071578063dd62ed3e146104a6578063e63ab1e9146104df578063f1b50c1d1461050657600080fd5b8063d53913931461046c578063d547741f1461049357600080fd5b8063a217fddf14610436578063a457c2d71461043e578063a9059cbb14610451578063b187984f1461046457600080fd5b806379cc67901161011457806391d14854116100f957806391d14854146103e957806395d89b4114610422578063a07c7ce41461042a57600080fd5b806379cc6790146103ce5780638456cb59146103e157600080fd5b806342966c68146103745780634d12d4b6146103875780635c975abb1461039a57806370a08231146103a557600080fd5b8063248a9ca3116101d857806336568abe116101a75780633b37d1d61161018c5780633b37d1d6146103515780633f4ba83a1461035957806340c10f191461036157600080fd5b806336568abe1461032b578063395093511461033e57600080fd5b8063248a9ca3146102dd5780632f2ff15d14610300578063313ce56714610313578063355274ea1461032257600080fd5b8063105babc311610214578063105babc3146102a757806318160ddd146102ae57806323b872dd146102c05780632403c08e146102d357600080fd5b806301ffc9a714610246578063047a7ef11461026e57806306fdde031461027f578063095ea7b314610294575b600080fd5b610259610254366004611dcc565b61050e565b60405190151581526020015b60405180910390f35b61016054610100900460ff16610259565b610287610545565b6040516102659190611e22565b6102596102a2366004611e6c565b6105d7565b6001610259565b6035545b604051908152602001610265565b6102596102ce366004611e96565b6105ef565b6102db610670565b005b6102b26102eb366004611ed2565b600090815260fb602052604090206001015490565b6102db61030e366004611eeb565b6106dc565b60405160128152602001610265565b61012d546102b2565b6102db610339366004611eeb565b610706565b61025961034c366004611e6c565b610792565b6102db6107d1565b6102db610841565b6102db61036f366004611e6c565b610876565b6102db610382366004611ed2565b6108aa565b6102db610395366004611fba565b6108b4565b60975460ff16610259565b6102b26103b3366004612036565b6001600160a01b031660009081526033602052604090205490565b6102db6103dc366004611e6c565b6109d1565b6102db6109e6565b6102596103f7366004611eeb565b600091825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610287610a18565b6101605460ff16610259565b6102b2600081565b61025961044c366004611e6c565b610a27565b61025961045f366004611e6c565b610adc565b6102db610b56565b6102b27f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6102db6104a1366004611eeb565b610bd6565b6102b26104b4366004612051565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b6102b27f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6102db610bfb565b60006001600160e01b03198216637965db0b60e01b148061053f57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060603680546105549061207b565b80601f01602080910402602001604051908101604052809291908181526020018280546105809061207b565b80156105cd5780601f106105a2576101008083540402835291602001916105cd565b820191906000526020600020905b8154815290600101906020018083116105b057829003601f168201915b5050505050905090565b6000336105e5818585610c8d565b5060019392505050565b61016054600090610100900460ff1661065d5760405162461bcd60e51b815260206004820152602560248201527f5472616e736665727261626c653a207472616e7366657273206172652064697360448201526418589b195960da1b60648201526084015b60405180910390fd5b610668848484610db1565b949350505050565b600061067b81610dca565b6101605460ff166106ce5760405162461bcd60e51b815260206004820152601d60248201527f4275726e61626c653a206275726e696e672069732064697361626c65640000006044820152606401610654565b50610160805460ff19169055565b600082815260fb60205260409020600101546106f781610dca565b6107018383610dd4565b505050565b6001600160a01b03811633146107845760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c6600000000000000000000000000000000006064820152608401610654565b61078e8282610e76565b5050565b3360008181526034602090815260408083206001600160a01b03871684529091528120549091906105e590829086906107cc9087906120cc565b610c8d565b60006107dc81610dca565b6101605460ff16156108305760405162461bcd60e51b815260206004820152601c60248201527f4275726e61626c653a206275726e696e6720697320656e61626c6564000000006044820152606401610654565b50610160805460ff19166001179055565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a61086b81610dca565b610873610ef9565b50565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a66108a081610dca565b6107018383610f95565b6108733382610f9f565b60006108c06001611042565b905080156108d8576000805461ff0019166101001790555b6108e2848461115d565b6108ea6111d2565b6108f261123f565b6108fa6111d2565b610903826112b2565b61090e600033610dd4565b610919600086610dd4565b6109437f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a86610dd4565b61096d7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a686610dd4565b610978600033610e76565b610160805461ffff1916905580156109ca576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050505050565b6109dc823383611326565b61078e8282610f9f565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610a1081610dca565b6108736113b8565b6060603780546105549061207b565b3360008181526034602090815260408083206001600160a01b038716845290915281205490919083811015610ac45760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152608401610654565b610ad18286868403610c8d565b506001949350505050565b61016054600090610100900460ff16610b455760405162461bcd60e51b815260206004820152602560248201527f5472616e736665727261626c653a207472616e7366657273206172652064697360448201526418589b195960da1b6064820152608401610654565b610b4f8383611433565b9392505050565b6000610b6181610dca565b61016054610100900460ff16610bc75760405162461bcd60e51b815260206004820152602560248201527f5472616e736665727261626c653a207472616e7366657273206172652064697360448201526418589b195960da1b6064820152608401610654565b50610160805461ff0019169055565b600082815260fb6020526040902060010154610bf181610dca565b6107018383610e76565b6000610c0681610dca565b61016054610100900460ff1615610c6b5760405162461bcd60e51b8152602060048201526024808201527f5472616e736665727261626c653a207472616e73666572732061726520656e61604482015263189b195960e21b6064820152608401610654565b50610160805461ff001916610100179055565b6001600160a01b03163b151590565b6001600160a01b038316610cef5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610654565b6001600160a01b038216610d505760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610654565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b600033610dbf858285611326565b610ad185858561143d565b6108738133611645565b600082815260fb602090815260408083206001600160a01b038516845290915290205460ff1661078e57600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610e323390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600082815260fb602090815260408083206001600160a01b038516845290915290205460ff161561078e57600082815260fb602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60975460ff16610f4b5760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f74207061757365640000000000000000000000006044820152606401610654565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b61078e82826116c5565b60975460ff1615610fe55760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610654565b6101605460ff166110385760405162461bcd60e51b815260206004820152601d60248201527f4275726e61626c653a206275726e696e672069732064697361626c65640000006044820152606401610654565b61078e8282611735565b60008054610100900460ff16156110d0578160ff1660011480156110655750303b155b6110c85760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610654565b506000919050565b60005460ff80841691161061113e5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610654565b506000805460ff191660ff92909216919091179055600190565b919050565b600054610100900460ff166111c85760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610654565b61078e828261188f565b600054610100900460ff1661123d5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610654565b565b600054610100900460ff166112aa5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610654565b61123d611921565b600054610100900460ff1661131d5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610654565b61087381611998565b6001600160a01b0383811660009081526034602090815260408083209386168352929052205460001981146113b257818110156113a55760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610654565b6113b28484848403610c8d565b50505050565b60975460ff16156113fe5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610654565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610f783390565b6000336105e58185855b6001600160a01b0383166114b95760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610654565b6001600160a01b03821661151b5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610654565b611526838383611a59565b6001600160a01b038316600090815260336020526040902054818110156115b55760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610654565b6001600160a01b038085166000908152603360205260408082208585039055918516815290812080548492906115ec9084906120cc565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161163891815260200190565b60405180910390a36113b2565b600082815260fb602090815260408083206001600160a01b038516845290915290205460ff1661078e57611683816001600160a01b03166014611a9f565b61168e836020611a9f565b60405160200161169f9291906120e4565b60408051601f198184030181529082905262461bcd60e51b825261065491600401611e22565b61012d54816116d360355490565b6116dd91906120cc565b111561172b5760405162461bcd60e51b815260206004820152601960248201527f45524332304361707065643a20636170206578636565646564000000000000006044820152606401610654565b61078e8282611c48565b6001600160a01b0382166117955760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610654565b6117a182600083611a59565b6001600160a01b038216600090815260336020526040902054818110156118155760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610654565b6001600160a01b0383166000908152603360205260408120838303905560358054849290611844908490612165565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b600054610100900460ff166118fa5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610654565b815161190d906036906020850190611d33565b508051610701906037906020840190611d33565b600054610100900460ff1661198c5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610654565b6097805460ff19169055565b600054610100900460ff16611a035760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b6064820152608401610654565b60008111611a535760405162461bcd60e51b815260206004820152601560248201527f45524332304361707065643a20636170206973203000000000000000000000006044820152606401610654565b61012d55565b60975460ff16156107015760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610654565b60606000611aae83600261217c565b611ab99060026120cc565b67ffffffffffffffff811115611ad157611ad1611f17565b6040519080825280601f01601f191660200182016040528015611afb576020820181803683370190505b509050600360fc1b81600081518110611b1657611b1661219b565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611b4557611b4561219b565b60200101906001600160f81b031916908160001a9053506000611b6984600261217c565b611b749060016120cc565b90505b6001811115611bf9577f303132333435363738396162636465660000000000000000000000000000000085600f1660108110611bb557611bb561219b565b1a60f81b828281518110611bcb57611bcb61219b565b60200101906001600160f81b031916908160001a90535060049490941c93611bf2816121b1565b9050611b77565b508315610b4f5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610654565b6001600160a01b038216611c9e5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610654565b611caa60008383611a59565b8060356000828254611cbc91906120cc565b90915550506001600160a01b03821660009081526033602052604081208054839290611ce99084906120cc565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054611d3f9061207b565b90600052602060002090601f016020900481019282611d615760008555611da7565b82601f10611d7a57805160ff1916838001178555611da7565b82800160010185558215611da7579182015b82811115611da7578251825591602001919060010190611d8c565b50611db3929150611db7565b5090565b5b80821115611db35760008155600101611db8565b600060208284031215611dde57600080fd5b81356001600160e01b031981168114610b4f57600080fd5b60005b83811015611e11578181015183820152602001611df9565b838111156113b25750506000910152565b6020815260008251806020840152611e41816040850160208701611df6565b601f01601f19169190910160400192915050565b80356001600160a01b038116811461115857600080fd5b60008060408385031215611e7f57600080fd5b611e8883611e55565b946020939093013593505050565b600080600060608486031215611eab57600080fd5b611eb484611e55565b9250611ec260208501611e55565b9150604084013590509250925092565b600060208284031215611ee457600080fd5b5035919050565b60008060408385031215611efe57600080fd5b82359150611f0e60208401611e55565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112611f3e57600080fd5b813567ffffffffffffffff80821115611f5957611f59611f17565b604051601f8301601f19908116603f01168101908282118183101715611f8157611f81611f17565b81604052838152866020858801011115611f9a57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060008060808587031215611fd057600080fd5b611fd985611e55565b9350602085013567ffffffffffffffff80821115611ff657600080fd5b61200288838901611f2d565b9450604087013591508082111561201857600080fd5b5061202587828801611f2d565b949793965093946060013593505050565b60006020828403121561204857600080fd5b610b4f82611e55565b6000806040838503121561206457600080fd5b61206d83611e55565b9150611f0e60208401611e55565b600181811c9082168061208f57607f821691505b602082108114156120b057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156120df576120df6120b6565b500190565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161211c816017850160208801611df6565b7f206973206d697373696e6720726f6c65200000000000000000000000000000006017918401918201528351612159816028840160208801611df6565b01602801949350505050565b600082821015612177576121776120b6565b500390565b6000816000190483118215151615612196576121966120b6565b500290565b634e487b7160e01b600052603260045260246000fd5b6000816121c0576121c06120b6565b50600019019056fea164736f6c6343000809000a496e697469616c697a61626c653a20636f6e747261637420697320616c726561";

type OrigamiGovernanceTokenTestVersionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OrigamiGovernanceTokenTestVersionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OrigamiGovernanceTokenTestVersion__factory extends ContractFactory {
  constructor(...args: OrigamiGovernanceTokenTestVersionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<OrigamiGovernanceTokenTestVersion> {
    return super.deploy(
      overrides || {}
    ) as Promise<OrigamiGovernanceTokenTestVersion>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): OrigamiGovernanceTokenTestVersion {
    return super.attach(address) as OrigamiGovernanceTokenTestVersion;
  }
  override connect(signer: Signer): OrigamiGovernanceTokenTestVersion__factory {
    return super.connect(signer) as OrigamiGovernanceTokenTestVersion__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OrigamiGovernanceTokenTestVersionInterface {
    return new utils.Interface(
      _abi
    ) as OrigamiGovernanceTokenTestVersionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OrigamiGovernanceTokenTestVersion {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OrigamiGovernanceTokenTestVersion;
  }
}
