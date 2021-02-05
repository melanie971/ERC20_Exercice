var ERC20Token = artifacts.require("./ERC20Token.sol");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(ERC20Token, 100);
};