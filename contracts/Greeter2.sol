// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "hardhat/console.sol";

error GreeterError();

contract GreeterV2 {
    string public greeting;

    function greet() public view returns (string memory) {
        return string(abi.encodePacked(greeting, "!!!"));
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function throwError() external pure {
        revert GreeterError();
    }
}
