// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./IPFS.sol";

contract Clockworks_v1 is ERC721 {
    using IPFS for bytes32;
    using IPFS for bytes;

    uint256 public totalSupply;
    uint256 public growthTime;
    uint256 public maxGrowthCount;

    bytes32[] public tokenURIs;
    mapping(uint256 => uint256) public clockStartedAt;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        uint256 _growthTime,
        uint256 _maxGrowthCount,
        bytes32[] memory _tokenURIs
    ) ERC721(_name, _symbol) {
        require(_tokenURIs.length == _maxGrowthCount + 1, "invalid length");
        for (uint256 i = 1; i <= _totalSupply; i++) {
            _mint(msg.sender, i);
        }
        totalSupply = _totalSupply;
        growthTime = _growthTime;
        maxGrowthCount = _maxGrowthCount;
        tokenURIs = _tokenURIs;
    }

    function _beforeTokenTransfer(
        address,
        address,
        uint256 _tokenId
    ) internal virtual override {
        clockStartedAt[_tokenId] = block.timestamp;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "query for nonexistent token");
        uint256 growth = block.timestamp - clockStartedAt[_tokenId];
        uint256 index = growth / growthTime;
        if (index >= maxGrowthCount) {
            index = maxGrowthCount;
        }
        return string(tokenURIs[index].addSha256FunctionCodePrefixToDigest().toBase58().addIpfsBaseUrlPrefix());
    }
}
