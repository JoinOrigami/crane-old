// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "./OrigamiGovernanceToken.sol";
import "./OrigamiGovernanceTokenProxy.sol";

/// @custom:security-contact contract-security@joinorigami.com
contract OrigamiGovernanceTokenFactory is Initializable, AccessControlUpgradeable {
    address[] public proxiedContracts;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function createOrigamiGovernanceToken(
        string memory _name,
        string memory _symbol,
        uint256 _supplyCap
    ) public returns (address) {
        OrigamiGovernanceToken token = new OrigamiGovernanceToken();
        bytes memory data = abi.encodeWithSelector(
            OrigamiGovernanceToken(address(0)).initialize.selector,
            _name,
            _symbol,
            _supplyCap
        );
        OrigamiGovernanceTokenProxy proxy = new OrigamiGovernanceTokenProxy(address(token), msg.sender, data);
        proxiedContracts.push(address(proxy));
        return address(proxy);
    }

    function getProxyContractAddress(uint256 index) public view onlyRole(DEFAULT_ADMIN_ROLE) returns (address) {
        require(index < proxiedContracts.length, "Index out of bounds");
        return proxiedContracts[index];
    }
}
