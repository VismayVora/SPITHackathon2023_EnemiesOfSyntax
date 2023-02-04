// https://eth-goerli.g.alchemy.com/v2/YND8P7p2yqFFNQmhvspzG4jwf8OQEoST
require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/YND8P7p2yqFFNQmhvspzG4jwf8OQEoST",
      accounts: [
        "1d6e4eaa51352b547d9be2938a55df2a0e4fb1b35867605612d165cdc29585d8",
      ],
    },
  },
};
