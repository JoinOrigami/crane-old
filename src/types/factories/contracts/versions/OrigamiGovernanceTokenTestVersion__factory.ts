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
    inputs: [],
    name: "TRANSFERRER_ROLE",
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
  "0x60806040523480156200001157600080fd5b506200001c62000022565b62000152565b6200002e60ff62000031565b50565b60008054610100900460ff1615620000ca578160ff1660011480156200006a575062000068306200014360201b62000da71760201c565b155b620000c25760405162461bcd60e51b815260206004820152602e60248201526000805160206200246083398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b506000919050565b60005460ff808416911610620001295760405162461bcd60e51b815260206004820152602e60248201526000805160206200246083398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401620000b9565b506000805460ff191660ff92909216919091179055600190565b6001600160a01b03163b151590565b6122fe80620001626000396000f3fe608060405234801561001057600080fd5b506004361061025c5760003560e01c80634d12d4b611610145578063a217fddf116100bd578063d53913931161008c578063dd62ed3e11610071578063dd62ed3e146104e8578063e63ab1e914610521578063f1b50c1d1461054857600080fd5b8063d5391393146104ae578063d547741f146104d557600080fd5b8063a217fddf14610478578063a457c2d714610480578063a9059cbb14610493578063b187984f146104a657600080fd5b806379cc67901161011457806391d14854116100f957806391d148541461042b57806395d89b4114610464578063a07c7ce41461046c57600080fd5b806379cc6790146104105780638456cb591461042357600080fd5b80634d12d4b6146103a25780635c975abb146103b557806363ac5d97146103c057806370a08231146103e757600080fd5b80632f2ff15d116101d857806339509351116101a75780633f4ba83a1161018c5780633f4ba83a1461037457806340c10f191461037c57806342966c681461038f57600080fd5b806339509351146103595780633b37d1d61461036c57600080fd5b80632f2ff15d1461031b578063313ce5671461032e578063355274ea1461033d57806336568abe1461034657600080fd5b8063105babc31161022f57806323b872dd1161021457806323b872dd146102db5780632403c08e146102ee578063248a9ca3146102f857600080fd5b8063105babc3146102c257806318160ddd146102c957600080fd5b806301ffc9a714610261578063047a7ef11461028957806306fdde031461029a578063095ea7b3146102af575b600080fd5b61027461026f366004611ef5565b610550565b60405190151581526020015b60405180910390f35b61016054610100900460ff16610274565b6102a2610587565b6040516102809190611f4b565b6102746102bd366004611f95565b610619565b6001610274565b6035545b604051908152602001610280565b6102746102e9366004611fbf565b610631565b6102f66106e2565b005b6102cd610306366004611ffb565b600090815260fb602052604090206001015490565b6102f6610329366004612014565b61074e565b60405160128152602001610280565b61012d546102cd565b6102f6610354366004612014565b610778565b610274610367366004611f95565b610804565b6102f6610843565b6102f66108b3565b6102f661038a366004611f95565b6108e8565b6102f661039d366004611ffb565b61091c565b6102f66103b03660046120e3565b610926565b60975460ff16610274565b6102cd7f9c0b3a9882e11a6bfb8283b46d1e79513afb8024ee864cd3a5b3a9050c42a7d781565b6102cd6103f536600461215f565b6001600160a01b031660009081526033602052604090205490565b6102f661041e366004611f95565b610a99565b6102f6610aae565b610274610439366004612014565b600091825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6102a2610ae0565b6101605460ff16610274565b6102cd600081565b61027461048e366004611f95565b610aef565b6102746104a1366004611f95565b610ba4565b6102f6610c4e565b6102cd7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6102f66104e3366004612014565b610cff565b6102cd6104f636600461217a565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b6102cd7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6102f6610d24565b60006001600160e01b03198216637965db0b60e01b148061058157506301ffc9a760e01b6001600160e01b03198316145b92915050565b606060368054610596906121a4565b80601f01602080910402602001604051908101604052809291908181526020018280546105c2906121a4565b801561060f5780601f106105e45761010080835404028352916020019161060f565b820191906000526020600020905b8154815290600101906020018083116105f257829003601f168201915b5050505050905090565b600033610627818585610db6565b5060019392505050565b600061065d7f9c0b3a9882e11a6bfb8283b46d1e79513afb8024ee864cd3a5b3a9050c42a7d733610439565b80610670575061016054610100900460ff165b6106cf5760405162461bcd60e51b815260206004820152602560248201527f5472616e736665727261626c653a207472616e7366657273206172652064697360448201526418589b195960da1b60648201526084015b60405180910390fd5b6106da848484610eda565b949350505050565b60006106ed81610ef3565b6101605460ff166107405760405162461bcd60e51b815260206004820152601d60248201527f4275726e61626c653a206275726e696e672069732064697361626c656400000060448201526064016106c6565b50610160805460ff19169055565b600082815260fb602052604090206001015461076981610ef3565b6107738383610efd565b505050565b6001600160a01b03811633146107f65760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084016106c6565b6108008282610f9f565b5050565b3360008181526034602090815260408083206001600160a01b0387168452909152812054909190610627908290869061083e9087906121f5565b610db6565b600061084e81610ef3565b6101605460ff16156108a25760405162461bcd60e51b815260206004820152601c60248201527f4275726e61626c653a206275726e696e6720697320656e61626c65640000000060448201526064016106c6565b50610160805460ff19166001179055565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6108dd81610ef3565b6108e5611022565b50565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a661091281610ef3565b61077383836110be565b6108e533826110c8565b6000610932600161116b565b9050801561094a576000805461ff0019166101001790555b6001600160a01b0385166109a05760405162461bcd60e51b815260206004820152601c60248201527f41646d696e20616464726573732063616e6e6f74206265207a65726f0000000060448201526064016106c6565b6109aa8484611286565b6109b26112fb565b6109ba611368565b6109c26112fb565b6109cb826113db565b6109d6600033610efd565b6109e1600086610efd565b610a0b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a86610efd565b610a357f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a686610efd565b610a40600033610f9f565b610160805461ffff191690558015610a92576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050505050565b610aa482338361144f565b61080082826110c8565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610ad881610ef3565b6108e56114e1565b606060378054610596906121a4565b3360008181526034602090815260408083206001600160a01b038716845290915281205490919083811015610b8c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084016106c6565b610b998286868403610db6565b506001949350505050565b6000610bd07f9c0b3a9882e11a6bfb8283b46d1e79513afb8024ee864cd3a5b3a9050c42a7d733610439565b80610be3575061016054610100900460ff165b610c3d5760405162461bcd60e51b815260206004820152602560248201527f5472616e736665727261626c653a207472616e7366657273206172652064697360448201526418589b195960da1b60648201526084016106c6565b610c47838361155c565b9392505050565b6000610c5981610ef3565b610c837f9c0b3a9882e11a6bfb8283b46d1e79513afb8024ee864cd3a5b3a9050c42a7d733610439565b80610c96575061016054610100900460ff165b610cf05760405162461bcd60e51b815260206004820152602560248201527f5472616e736665727261626c653a207472616e7366657273206172652064697360448201526418589b195960da1b60648201526084016106c6565b50610160805461ff0019169055565b600082815260fb6020526040902060010154610d1a81610ef3565b6107738383610f9f565b6000610d2f81610ef3565b61016054610100900460ff1615610d945760405162461bcd60e51b8152602060048201526024808201527f5472616e736665727261626c653a207472616e73666572732061726520656e61604482015263189b195960e21b60648201526084016106c6565b50610160805461ff001916610100179055565b6001600160a01b03163b151590565b6001600160a01b038316610e185760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016106c6565b6001600160a01b038216610e795760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016106c6565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b600033610ee885828561144f565b610b99858585611566565b6108e5813361176e565b600082815260fb602090815260408083206001600160a01b038516845290915290205460ff1661080057600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610f5b3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600082815260fb602090815260408083206001600160a01b038516845290915290205460ff161561080057600082815260fb602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60975460ff166110745760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573656400000000000000000000000060448201526064016106c6565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b61080082826117ee565b60975460ff161561110e5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016106c6565b6101605460ff166111615760405162461bcd60e51b815260206004820152601d60248201527f4275726e61626c653a206275726e696e672069732064697361626c656400000060448201526064016106c6565b610800828261185e565b60008054610100900460ff16156111f9578160ff16600114801561118e5750303b155b6111f15760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016106c6565b506000919050565b60005460ff8084169116106112675760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016106c6565b506000805460ff191660ff92909216919091179055600190565b919050565b600054610100900460ff166112f15760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106c6565b61080082826119b8565b600054610100900460ff166113665760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106c6565b565b600054610100900460ff166113d35760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106c6565b611366611a4a565b600054610100900460ff166114465760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106c6565b6108e581611ac1565b6001600160a01b0383811660009081526034602090815260408083209386168352929052205460001981146114db57818110156114ce5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016106c6565b6114db8484848403610db6565b50505050565b60975460ff16156115275760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016106c6565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586110a13390565b6000336106278185855b6001600160a01b0383166115e25760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f647265737300000000000000000000000000000000000000000000000000000060648201526084016106c6565b6001600160a01b0382166116445760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016106c6565b61164f838383611b82565b6001600160a01b038316600090815260336020526040902054818110156116de5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016106c6565b6001600160a01b038085166000908152603360205260408082208585039055918516815290812080548492906117159084906121f5565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161176191815260200190565b60405180910390a36114db565b600082815260fb602090815260408083206001600160a01b038516845290915290205460ff16610800576117ac816001600160a01b03166014611bc8565b6117b7836020611bc8565b6040516020016117c892919061220d565b60408051601f198184030181529082905262461bcd60e51b82526106c691600401611f4b565b61012d54816117fc60355490565b61180691906121f5565b11156118545760405162461bcd60e51b815260206004820152601960248201527f45524332304361707065643a206361702065786365656465640000000000000060448201526064016106c6565b6108008282611d71565b6001600160a01b0382166118be5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016106c6565b6118ca82600083611b82565b6001600160a01b0382166000908152603360205260409020548181101561193e5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016106c6565b6001600160a01b038316600090815260336020526040812083830390556035805484929061196d90849061228e565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b600054610100900460ff16611a235760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106c6565b8151611a36906036906020850190611e5c565b508051610773906037906020840190611e5c565b600054610100900460ff16611ab55760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106c6565b6097805460ff19169055565b600054610100900460ff16611b2c5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106c6565b60008111611b7c5760405162461bcd60e51b815260206004820152601560248201527f45524332304361707065643a206361702069732030000000000000000000000060448201526064016106c6565b61012d55565b60975460ff16156107735760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016106c6565b60606000611bd78360026122a5565b611be29060026121f5565b67ffffffffffffffff811115611bfa57611bfa612040565b6040519080825280601f01601f191660200182016040528015611c24576020820181803683370190505b509050600360fc1b81600081518110611c3f57611c3f6122c4565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611c6e57611c6e6122c4565b60200101906001600160f81b031916908160001a9053506000611c928460026122a5565b611c9d9060016121f5565b90505b6001811115611d22577f303132333435363738396162636465660000000000000000000000000000000085600f1660108110611cde57611cde6122c4565b1a60f81b828281518110611cf457611cf46122c4565b60200101906001600160f81b031916908160001a90535060049490941c93611d1b816122da565b9050611ca0565b508315610c475760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016106c6565b6001600160a01b038216611dc75760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016106c6565b611dd360008383611b82565b8060356000828254611de591906121f5565b90915550506001600160a01b03821660009081526033602052604081208054839290611e129084906121f5565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054611e68906121a4565b90600052602060002090601f016020900481019282611e8a5760008555611ed0565b82601f10611ea357805160ff1916838001178555611ed0565b82800160010185558215611ed0579182015b82811115611ed0578251825591602001919060010190611eb5565b50611edc929150611ee0565b5090565b5b80821115611edc5760008155600101611ee1565b600060208284031215611f0757600080fd5b81356001600160e01b031981168114610c4757600080fd5b60005b83811015611f3a578181015183820152602001611f22565b838111156114db5750506000910152565b6020815260008251806020840152611f6a816040850160208701611f1f565b601f01601f19169190910160400192915050565b80356001600160a01b038116811461128157600080fd5b60008060408385031215611fa857600080fd5b611fb183611f7e565b946020939093013593505050565b600080600060608486031215611fd457600080fd5b611fdd84611f7e565b9250611feb60208501611f7e565b9150604084013590509250925092565b60006020828403121561200d57600080fd5b5035919050565b6000806040838503121561202757600080fd5b8235915061203760208401611f7e565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261206757600080fd5b813567ffffffffffffffff8082111561208257612082612040565b604051601f8301601f19908116603f011681019082821181831017156120aa576120aa612040565b816040528381528660208588010111156120c357600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080600080608085870312156120f957600080fd5b61210285611f7e565b9350602085013567ffffffffffffffff8082111561211f57600080fd5b61212b88838901612056565b9450604087013591508082111561214157600080fd5b5061214e87828801612056565b949793965093946060013593505050565b60006020828403121561217157600080fd5b610c4782611f7e565b6000806040838503121561218d57600080fd5b61219683611f7e565b915061203760208401611f7e565b600181811c908216806121b857607f821691505b602082108114156121d957634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115612208576122086121df565b500190565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351612245816017850160208801611f1f565b7f206973206d697373696e6720726f6c65200000000000000000000000000000006017918401918201528351612282816028840160208801611f1f565b01602801949350505050565b6000828210156122a0576122a06121df565b500390565b60008160001904831182151516156122bf576122bf6121df565b500290565b634e487b7160e01b600052603260045260246000fd5b6000816122e9576122e96121df565b50600019019056fea164736f6c6343000809000a496e697469616c697a61626c653a20636f6e747261637420697320616c726561";

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
