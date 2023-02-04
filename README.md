# Block-Crate

Blockchain based asset sharing system
Our idea is to build a decentralized platform where user can send and receive digital assets on top of a blockchain network. It would be a peer to peer sharing network that will enable users to send files and data across the network securely and easily


The Flow:

![image](https://user-images.githubusercontent.com/52329525/201524435-f1a9c39a-0b1b-4103-9555-66ec64bd5f18.png)

The Tech Stack:

![image](https://user-images.githubusercontent.com/52329525/201524461-c65f7b2d-61f3-4b07-a760-85161ba960da.png)

**Instructions to run:**


Start the server: **node index.js**

Start a local blockchain network using: **npx hardhat node**


Deploy the contract using: **npx hardhat run scripts/deploy.js --network localhost**

Install dependencies using: **npm install**


Start the react project: **npm start**

This code sample has 3 main folders.
The asset-share folder is the Front End part which is created using react js. Tailwind CSS is used for styling and web3modal is used for the connection part of the smart contracts.
The smart_contracts folder contain the 2 smart contracts of file sharing and chatting system using blockchain. It is written in solidity and hardhat is used for creating a local network.
The server folder is the backend folder which is created using nodejs. It is used to implement the RSA encryption and decryption using an npm package. It creates a public key and a private key for each user.

So the flow is:
Once the user signs in using his/her wallet a private and a public key is generated and stored on blockchain which is mapped to each user's wallet address. Then when a send wants to send a file to a receiver, the file is stored on IPFS and the hash of the file is encrypted using users public key and stored on blockchain by mapping to receiver's wallet address. Then at the receiver's end it is decrypted using it's private key stored on the blockchain.
