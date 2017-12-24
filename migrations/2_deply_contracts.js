var EthBox = artifacts.require("./EthBox.sol");

module.exports = function(deployer) {
  deployer.deploy(EthBox);
};
