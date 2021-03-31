// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./IPFS.sol";
import "hardhat/console.sol";

contract Cryptodoll is ERC721 {
    using IPFS for bytes32;
    using IPFS for bytes;

    uint256 public constant TOKEN_ID = 1;
    uint256 public growthTime;
    uint256 public maxGrowthCount;
    bytes32[] public tokenURIs;
    uint256 public growthStartedAt;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _growthTime,
        uint256 _maxGrowthCount,
        bytes32[] memory _tokenURIs
    ) ERC721(_name, _symbol) {
        require(_tokenURIs.length == _maxGrowthCount + 1, "invalid length");
        _mint(msg.sender, TOKEN_ID);
        growthTime = _growthTime;
        maxGrowthCount = _maxGrowthCount;
        tokenURIs = _tokenURIs;
    }

    function _beforeTokenTransfer(
        address,
        address,
        uint256
    ) internal virtual override {
        growthStartedAt = block.timestamp;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "query for nonexistent token");
        uint256 growth = block.timestamp - growthStartedAt;
        uint256 index = growth / growthTime;
        if (index >= maxGrowthCount) {
            index = maxGrowthCount;
        }
        return string(tokenURIs[index].addSha256FunctionCodePrefixToDigest().toBase58().addIpfsBaseUrlPrefix());
    }
}
