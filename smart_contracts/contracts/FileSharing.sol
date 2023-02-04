// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract FileSharing{
    struct File{
        string fileName;
        string senderName;
        string description;
        string hash;
    }
    mapping(address => string) pubkey;
    mapping(address => string) privkey;
    mapping(address => File[]) senderFiles;
    mapping(address => File[]) receiverFiles;
    function createUser(string memory publickey,string memory privatekey) public {
        require(bytes(pubkey[msg.sender]).length <= 0,"User Already Present");
        pubkey[msg.sender] = publickey;
        privkey[msg.sender] = privatekey;
    }

    function getPublicKey() public view returns(string memory){
        string memory pub = pubkey[msg.sender];
        return pub;
    }

    function getPrivateKey() public view returns(string memory){
        string memory priv = privkey[msg.sender];
        return priv;
    }

    function getReceiverPublicKey(address receiver) public view returns(string memory){
        string memory pub = pubkey[receiver];
        return pub;
    }

    function sendFile(address receiver, string memory fileName,string memory senderName, string memory description, string memory ipfsHash,string memory hash) public {
        require(bytes(pubkey[receiver]).length > 0,"User not in the DAPP");
        File memory sender;
        sender = File(fileName, senderName, description,ipfsHash);
        File memory receiverFile;
        receiverFile = File(fileName, senderName, description,hash);
        senderFiles[msg.sender].push(sender);
        receiverFiles[receiver].push(receiverFile);
    }
    
    function getReceivedFiles() public view returns(File[] memory){
        return receiverFiles[msg.sender];
    }

    function getFiles() public view returns(File[] memory){
        return senderFiles[msg.sender];
    }
}