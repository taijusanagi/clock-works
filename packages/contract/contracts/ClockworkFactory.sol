// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract ClockworkFactory {
    using Address for address;
    using Clones for address;

    event Deployed(address indexed owner, address indexed implementation, address indexed deployedContract, bytes data);

    function deploy(address implementation, bytes memory data) public payable {
        bytes32 salt = keccak256(abi.encodePacked(data, msg.sender));
        address deployedContract = implementation.cloneDeterministic(salt);
        deployedContract.functionCallWithValue(data, msg.value);
        emit Deployed(msg.sender, implementation, deployedContract, data);
    }

    function predictDeployResult(
        address owner,
        address implementation,
        bytes memory data
    ) public view returns (address) {
        bytes32 salt = keccak256(abi.encodePacked(data, owner));
        return implementation.predictDeterministicAddress(salt, address(this));
    }
}
