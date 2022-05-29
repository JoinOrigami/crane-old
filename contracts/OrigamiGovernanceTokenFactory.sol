// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./OrigamiGovernanceToken.sol";

/// @custom:security-contact contract-security@joinorigami.com
contract OrigamiGovernanceTokenFactory is Initializable {
    address private tokenImplementation;
    address[] public clonedContracts;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        tokenImplementation = address(new OrigamiGovernanceToken());
    }

    function createOrigamiGovernanceToken(
        string memory _name,
        string memory _symbol,
        uint256 _supplyCap
    ) public returns (address) {
        address clone = ClonesUpgradeable.clone(tokenImplementation);
        OrigamiGovernanceToken(clone).initialize(_name, _symbol, _supplyCap);
        clonedContracts.push(clone);
        return clone;
    }

    function getClonedContractAddress(uint256 index) public view returns (address) {
        require(index < clonedContracts.length, "Index out of bounds");
        return clonedContracts[index];
    }
}
