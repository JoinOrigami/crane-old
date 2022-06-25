// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

import "./OrigamiGovernanceToken.sol";

/// @custom:security-contact contract-security@joinorigami.com
contract OrigamiGovernanceTokenFactory is Initializable, AccessControlUpgradeable {
    address[] public proxiedContracts;
    address private tokenImplementation;

    event OrigamiGovernanceTokenCreated(address indexed caller, address proxy);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        tokenImplementation = address(new OrigamiGovernanceToken());
    }

    function createOrigamiGovernanceToken(
        address _admin,
        string memory _name,
        string memory _symbol,
        uint256 _supplyCap
    ) public onlyRole(DEFAULT_ADMIN_ROLE) returns (address) {
        address clone = ClonesUpgradeable.clone(tokenImplementation);
        bytes memory data = abi.encodeWithSelector(
            OrigamiGovernanceToken(clone).initialize.selector,
            _admin,
            _name,
            _symbol,
            _supplyCap
        );
        TransparentUpgradeableProxy proxy = new TransparentUpgradeableProxy(clone, _msgSender(), data);
        proxiedContracts.push(address(proxy));
        emit OrigamiGovernanceTokenCreated(_msgSender(), address(proxy));
        return address(proxy);
    }

    function getProxyContractAddress(uint256 index) public view onlyRole(DEFAULT_ADMIN_ROLE) returns (address payable) {
        require(index < proxiedContracts.length, "Proxy address index out of bounds");
        return payable(proxiedContracts[index]);
    }
}
