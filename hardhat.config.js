/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: "",
      },
    },
    mainnet: {
      url: "",
      accounts: []
    },
    polygon: {
      url: "",
      accounts: []
    },
    mumbai: {
      url: "",
      accounts: []
    }
  },
};
