// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DweetNft is ERC721 {
  struct NFT{
    uint token_id;
    string ipfs_hash;
  }
  mapping (address => NFT[]) public nfts;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  constructor() ERC721 ("SquareNFT", "SQUARE") {
    
  }

  function makeAnEpicNFT(string memory ipfsString) public {

    uint256 newItemId = _tokenIds.current();
    _safeMint(msg.sender, newItemId);
    tokenURI(newItemId,ipfsString);
    NFT memory n = NFT(newItemId,ipfsString);
    nfts[msg.sender].push(n);
    _tokenIds.increment();
  }

  function tokenURI(uint256 _tokenId,string memory ipfsString) public view returns (string memory) {
    require(_exists(_tokenId));
    return ipfsString;
  }

  function getUserNfts() public view returns(NFT[] memory) {
    return nfts[msg.sender];
  }
}