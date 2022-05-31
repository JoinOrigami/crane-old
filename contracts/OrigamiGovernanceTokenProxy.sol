// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

/// @custom:security-contact contract-security@joinorigami.com
contract OrigamiGovernanceTokenProxy is TransparentUpgradeableProxy {
    constructor(
        address _implementation,
        address admin,
        bytes memory data
    ) TransparentUpgradeableProxy(_implementation, admin, data) {}
}
