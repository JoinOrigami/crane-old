// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

import "./OrigamiGovernanceToken.sol";

/// @custom:security-contact contract-security@joinorigami.com
contract OrigamiGovernanceTokenFactory is Initializable, AccessControlUpgradeable {
    address[] public proxiedContracts;
    address private tokenImplementation;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        tokenImplementation = address(new OrigamiGovernanceToken());
    }

    function createOrigamiGovernanceToken(
        string memory _name,
        string memory _symbol,
        uint256 _supplyCap
    ) public onlyRole(DEFAULT_ADMIN_ROLE) returns (address) {
        address clone = ClonesUpgradeable.clone(tokenImplementation);
        bytes memory data = abi.encodeWithSelector(
            OrigamiGovernanceToken(clone).initialize.selector,
            _name,
            _symbol,
            _supplyCap
        );
        TransparentUpgradeableProxy proxy = new TransparentUpgradeableProxy(clone, _msgSender(), data);
        proxiedContracts.push(address(proxy));
        return address(proxy);
    }

    function getProxyContractAddress(uint256 index) public view onlyRole(DEFAULT_ADMIN_ROLE) returns (address payable) {
        require(index < proxiedContracts.length, "Index out of bounds");
        return payable(proxiedContracts[index]);
    }
}
