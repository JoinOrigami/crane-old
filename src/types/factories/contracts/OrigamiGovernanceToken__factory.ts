/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  OrigamiGovernanceToken,
  OrigamiGovernanceTokenInterface,
} from "../../contracts/OrigamiGovernanceToken";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
  "0x60806040523480156200001157600080fd5b506200001c62000022565b62000152565b6200002e60ff62000031565b50565b60008054610100900460ff1615620000ca578160ff1660011480156200006a575062000068306200014360201b62000d2f1760201c565b155b620000c25760405162461bcd60e51b815260206004820152602e6024820152600080516020620023e883398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b506000919050565b60005460ff808416911610620001295760405162461bcd60e51b815260206004820152602e6024820152600080516020620023e883398151915260448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401620000b9565b506000805460ff191660ff92909216919091179055600190565b6001600160a01b03163b151590565b61228680620001626000396000f3fe608060405234801561001057600080fd5b50600436106102415760003560e01c80634d12d4b611610145578063a217fddf116100bd578063d53913931161008c578063dd62ed3e11610071578063dd62ed3e146104c6578063e63ab1e9146104ff578063f1b50c1d1461052657600080fd5b8063d53913931461048c578063d547741f146104b357600080fd5b8063a217fddf14610456578063a457c2d71461045e578063a9059cbb14610471578063b187984f1461048457600080fd5b806379cc67901161011457806391d14854116100f957806391d148541461040957806395d89b4114610442578063a07c7ce41461044a57600080fd5b806379cc6790146103ee5780638456cb591461040157600080fd5b80634d12d4b6146103805780635c975abb1461039357806363ac5d971461039e57806370a08231146103c557600080fd5b80632f2ff15d116101d857806339509351116101a75780633f4ba83a1161018c5780633f4ba83a1461035257806340c10f191461035a57806342966c681461036d57600080fd5b806339509351146103375780633b37d1d61461034a57600080fd5b80632f2ff15d146102f9578063313ce5671461030c578063355274ea1461031b57806336568abe1461032457600080fd5b806318160ddd1161021457806318160ddd146102a757806323b872dd146102b95780632403c08e146102cc578063248a9ca3146102d657600080fd5b806301ffc9a714610246578063047a7ef11461026e57806306fdde031461027f578063095ea7b314610294575b600080fd5b610259610254366004611e7d565b61052e565b60405190151581526020015b60405180910390f35b61016054610100900460ff16610259565b610287610565565b6040516102659190611ed3565b6102596102a2366004611f1d565b6105f7565b6035545b604051908152602001610265565b6102596102c7366004611f47565b61060f565b6102d46106c0565b005b6102ab6102e4366004611f83565b600090815260fb602052604090206001015490565b6102d4610307366004611f9c565b61072c565b60405160128152602001610265565b61012d546102ab565b6102d4610332366004611f9c565b610756565b610259610345366004611f1d565b6107e2565b6102d4610821565b6102d4610891565b6102d4610368366004611f1d565b6108c6565b6102d461037b366004611f83565b6108fa565b6102d461038e36600461206b565b610904565b60975460ff16610259565b6102ab7f9c0b3a9882e11a6bfb8283b46d1e79513afb8024ee864cd3a5b3a9050c42a7d781565b6102ab6103d33660046120e7565b6001600160a01b031660009081526033602052604090205490565b6102d46103fc366004611f1d565b610a21565b6102d4610a36565b610259610417366004611f9c565b600091825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b610287610a68565b6101605460ff16610259565b6102ab600081565b61025961046c366004611f1d565b610a77565b61025961047f366004611f1d565b610b2c565b6102d4610bd6565b6102ab7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6102d46104c1366004611f9c565b610c87565b6102ab6104d4366004612102565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b6102ab7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6102d4610cac565b60006001600160e01b03198216637965db0b60e01b148061055f57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060603680546105749061212c565b80601f01602080910402602001604051908101604052809291908181526020018280546105a09061212c565b80156105ed5780601f106105c2576101008083540402835291602001916105ed565b820191906000526020600020905b8154815290600101906020018083116105d057829003601f168201915b5050505050905090565b600033610605818585610d3e565b5060019392505050565b600061063b7f9c0b3a9882e11a6bfb8283b46d1e79513afb8024ee864cd3a5b3a9050c42a7d733610417565b8061064e575061016054610100900460ff165b6106ad5760405162461bcd60e51b815260206004820152602560248201527f5472616e736665727261626c653a207472616e7366657273206172652064697360448201526418589b195960da1b60648201526084015b60405180910390fd5b6106b8848484610e62565b949350505050565b60006106cb81610e7b565b6101605460ff1661071e5760405162461bcd60e51b815260206004820152601d60248201527f4275726e61626c653a206275726e696e672069732064697361626c656400000060448201526064016106a4565b50610160805460ff19169055565b600082815260fb602052604090206001015461074781610e7b565b6107518383610e85565b505050565b6001600160a01b03811633146107d45760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084016106a4565b6107de8282610f27565b5050565b3360008181526034602090815260408083206001600160a01b0387168452909152812054909190610605908290869061081c90879061217d565b610d3e565b600061082c81610e7b565b6101605460ff16156108805760405162461bcd60e51b815260206004820152601c60248201527f4275726e61626c653a206275726e696e6720697320656e61626c65640000000060448201526064016106a4565b50610160805460ff19166001179055565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6108bb81610e7b565b6108c3610faa565b50565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a66108f081610e7b565b6107518383611046565b6108c33382611050565b600061091060016110f3565b90508015610928576000805461ff0019166101001790555b610932848461120e565b61093a611283565b6109426112f0565b61094a611283565b61095382611363565b61095e600033610e85565b610969600086610e85565b6109937f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a86610e85565b6109bd7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a686610e85565b6109c8600033610f27565b610160805461ffff191690558015610a1a576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050505050565b610a2c8233836113d7565b6107de8282611050565b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610a6081610e7b565b6108c3611469565b6060603780546105749061212c565b3360008181526034602090815260408083206001600160a01b038716845290915281205490919083811015610b145760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084016106a4565b610b218286868403610d3e565b506001949350505050565b6000610b587f9c0b3a9882e11a6bfb8283b46d1e79513afb8024ee864cd3a5b3a9050c42a7d733610417565b80610b6b575061016054610100900460ff165b610bc55760405162461bcd60e51b815260206004820152602560248201527f5472616e736665727261626c653a207472616e7366657273206172652064697360448201526418589b195960da1b60648201526084016106a4565b610bcf83836114e4565b9392505050565b6000610be181610e7b565b610c0b7f9c0b3a9882e11a6bfb8283b46d1e79513afb8024ee864cd3a5b3a9050c42a7d733610417565b80610c1e575061016054610100900460ff165b610c785760405162461bcd60e51b815260206004820152602560248201527f5472616e736665727261626c653a207472616e7366657273206172652064697360448201526418589b195960da1b60648201526084016106a4565b50610160805461ff0019169055565b600082815260fb6020526040902060010154610ca281610e7b565b6107518383610f27565b6000610cb781610e7b565b61016054610100900460ff1615610d1c5760405162461bcd60e51b8152602060048201526024808201527f5472616e736665727261626c653a207472616e73666572732061726520656e61604482015263189b195960e21b60648201526084016106a4565b50610160805461ff001916610100179055565b6001600160a01b03163b151590565b6001600160a01b038316610da05760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016106a4565b6001600160a01b038216610e015760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016106a4565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b600033610e708582856113d7565b610b218585856114ee565b6108c381336116f6565b600082815260fb602090815260408083206001600160a01b038516845290915290205460ff166107de57600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610ee33390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600082815260fb602090815260408083206001600160a01b038516845290915290205460ff16156107de57600082815260fb602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60975460ff16610ffc5760405162461bcd60e51b815260206004820152601460248201527f5061757361626c653a206e6f742070617573656400000000000000000000000060448201526064016106a4565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6107de8282611776565b60975460ff16156110965760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016106a4565b6101605460ff166110e95760405162461bcd60e51b815260206004820152601d60248201527f4275726e61626c653a206275726e696e672069732064697361626c656400000060448201526064016106a4565b6107de82826117e6565b60008054610100900460ff1615611181578160ff1660011480156111165750303b155b6111795760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016106a4565b506000919050565b60005460ff8084169116106111ef5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016106a4565b506000805460ff191660ff92909216919091179055600190565b919050565b600054610100900460ff166112795760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106a4565b6107de8282611940565b600054610100900460ff166112ee5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106a4565b565b600054610100900460ff1661135b5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106a4565b6112ee6119d2565b600054610100900460ff166113ce5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106a4565b6108c381611a49565b6001600160a01b03838116600090815260346020908152604080832093861683529290522054600019811461146357818110156114565760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016106a4565b6114638484848403610d3e565b50505050565b60975460ff16156114af5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016106a4565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586110293390565b6000336106058185855b6001600160a01b03831661156a5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f647265737300000000000000000000000000000000000000000000000000000060648201526084016106a4565b6001600160a01b0382166115cc5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016106a4565b6115d7838383611b0a565b6001600160a01b038316600090815260336020526040902054818110156116665760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e6365000000000000000000000000000000000000000000000000000060648201526084016106a4565b6001600160a01b0380851660009081526033602052604080822085850390559185168152908120805484929061169d90849061217d565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516116e991815260200190565b60405180910390a3611463565b600082815260fb602090815260408083206001600160a01b038516845290915290205460ff166107de57611734816001600160a01b03166014611b50565b61173f836020611b50565b604051602001611750929190612195565b60408051601f198184030181529082905262461bcd60e51b82526106a491600401611ed3565b61012d548161178460355490565b61178e919061217d565b11156117dc5760405162461bcd60e51b815260206004820152601960248201527f45524332304361707065643a206361702065786365656465640000000000000060448201526064016106a4565b6107de8282611cf9565b6001600160a01b0382166118465760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016106a4565b61185282600083611b0a565b6001600160a01b038216600090815260336020526040902054818110156118c65760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016106a4565b6001600160a01b03831660009081526033602052604081208383039055603580548492906118f5908490612216565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b600054610100900460ff166119ab5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106a4565b81516119be906036906020850190611de4565b508051610751906037906020840190611de4565b600054610100900460ff16611a3d5760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106a4565b6097805460ff19169055565b600054610100900460ff16611ab45760405162461bcd60e51b815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201526a6e697469616c697a696e6760a81b60648201526084016106a4565b60008111611b045760405162461bcd60e51b815260206004820152601560248201527f45524332304361707065643a206361702069732030000000000000000000000060448201526064016106a4565b61012d55565b60975460ff16156107515760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016106a4565b60606000611b5f83600261222d565b611b6a90600261217d565b67ffffffffffffffff811115611b8257611b82611fc8565b6040519080825280601f01601f191660200182016040528015611bac576020820181803683370190505b509050600360fc1b81600081518110611bc757611bc761224c565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611bf657611bf661224c565b60200101906001600160f81b031916908160001a9053506000611c1a84600261222d565b611c2590600161217d565b90505b6001811115611caa577f303132333435363738396162636465660000000000000000000000000000000085600f1660108110611c6657611c6661224c565b1a60f81b828281518110611c7c57611c7c61224c565b60200101906001600160f81b031916908160001a90535060049490941c93611ca381612262565b9050611c28565b508315610bcf5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016106a4565b6001600160a01b038216611d4f5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016106a4565b611d5b60008383611b0a565b8060356000828254611d6d919061217d565b90915550506001600160a01b03821660009081526033602052604081208054839290611d9a90849061217d565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054611df09061212c565b90600052602060002090601f016020900481019282611e125760008555611e58565b82601f10611e2b57805160ff1916838001178555611e58565b82800160010185558215611e58579182015b82811115611e58578251825591602001919060010190611e3d565b50611e64929150611e68565b5090565b5b80821115611e645760008155600101611e69565b600060208284031215611e8f57600080fd5b81356001600160e01b031981168114610bcf57600080fd5b60005b83811015611ec2578181015183820152602001611eaa565b838111156114635750506000910152565b6020815260008251806020840152611ef2816040850160208701611ea7565b601f01601f19169190910160400192915050565b80356001600160a01b038116811461120957600080fd5b60008060408385031215611f3057600080fd5b611f3983611f06565b946020939093013593505050565b600080600060608486031215611f5c57600080fd5b611f6584611f06565b9250611f7360208501611f06565b9150604084013590509250925092565b600060208284031215611f9557600080fd5b5035919050565b60008060408385031215611faf57600080fd5b82359150611fbf60208401611f06565b90509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112611fef57600080fd5b813567ffffffffffffffff8082111561200a5761200a611fc8565b604051601f8301601f19908116603f0116810190828211818310171561203257612032611fc8565b8160405283815286602085880101111561204b57600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806000806080858703121561208157600080fd5b61208a85611f06565b9350602085013567ffffffffffffffff808211156120a757600080fd5b6120b388838901611fde565b945060408701359150808211156120c957600080fd5b506120d687828801611fde565b949793965093946060013593505050565b6000602082840312156120f957600080fd5b610bcf82611f06565b6000806040838503121561211557600080fd5b61211e83611f06565b9150611fbf60208401611f06565b600181811c9082168061214057607f821691505b6020821081141561216157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561219057612190612167565b500190565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516121cd816017850160208801611ea7565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000601791840191820152835161220a816028840160208801611ea7565b01602801949350505050565b60008282101561222857612228612167565b500390565b600081600019048311821515161561224757612247612167565b500290565b634e487b7160e01b600052603260045260246000fd5b60008161227157612271612167565b50600019019056fea164736f6c6343000809000a496e697469616c697a61626c653a20636f6e747261637420697320616c726561";

type OrigamiGovernanceTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OrigamiGovernanceTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OrigamiGovernanceToken__factory extends ContractFactory {
  constructor(...args: OrigamiGovernanceTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<OrigamiGovernanceToken> {
    return super.deploy(overrides || {}) as Promise<OrigamiGovernanceToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): OrigamiGovernanceToken {
    return super.attach(address) as OrigamiGovernanceToken;
  }
  override connect(signer: Signer): OrigamiGovernanceToken__factory {
    return super.connect(signer) as OrigamiGovernanceToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OrigamiGovernanceTokenInterface {
    return new utils.Interface(_abi) as OrigamiGovernanceTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OrigamiGovernanceToken {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OrigamiGovernanceToken;
  }
}
