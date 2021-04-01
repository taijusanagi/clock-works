// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./extensions/IPFS.sol";
import "./interfaces/IHasSecondarySaleFees.sol";

contract Clockworks_v1 is Initializable, ERC721Upgradeable, OwnableUpgradeable {
    using IPFS for bytes32;
    using IPFS for bytes;

    mapping(uint256 => uint256) public clockStartedAt;

    uint256 public totalSupply;
    uint256 public switchTime;
    uint256 public maxSwitchCount;

    bytes32[] private tokenURIs;
    address payable[] private royaltyRecipients;
    uint256[] private royaltyBps;

    function initialize(
        address _owner,
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        uint256 _switchTime,
        uint256 _maxSwitchCount,
        bytes32[] memory _tokenURIs,
        address payable[] memory _royaltyRecipients,
        uint256[] memory _royaltyBps
    ) public initializer {
        require(_tokenURIs.length == _maxSwitchCount + 1, "invalid length");
        for (uint256 i = 1; i <= _totalSupply; i++) {
            _mint(msg.sender, i);
        }
        totalSupply = _totalSupply;
        switchTime = _switchTime;
        maxSwitchCount = _maxSwitchCount;
        tokenURIs = _tokenURIs;
        royaltyRecipients = _royaltyRecipients;
        royaltyBps = _royaltyBps;
        __Ownable_init_unchained();
        transferOwnership(_owner);
        __ERC721_init_unchained(_name, _symbol);
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
        uint256 clockedTime = block.timestamp - clockStartedAt[_tokenId];
        uint256 index = clockedTime / switchTime;
        if (index >= maxSwitchCount) {
            index = maxSwitchCount;
        }
        return string(tokenURIs[index].addSha256FunctionCodePrefixToDigest().toBase58().addIpfsBaseUrlPrefix());
    }

    function getFeeRecipients(uint256 _tokenId) public view returns (address payable[] memory) {
        require(_exists(_tokenId), "query for nonexistent token");
        return royaltyRecipients;
    }

    function getFeeBps(uint256 _tokenId) public view returns (uint256[] memory) {
        require(_exists(_tokenId), "query for nonexistent token");
        return royaltyBps;
    }

    function supportsInterface(bytes4 _interfaceId) public view override returns (bool) {
        return _interfaceId == type(IHasSecondarySaleFees).interfaceId || super.supportsInterface(_interfaceId);
    }
}
