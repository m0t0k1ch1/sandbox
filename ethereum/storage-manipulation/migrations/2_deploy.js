const Vulnerable = artifacts.require('./Vulnerable.sol');

module.exports = async (deployer) => {
  await deployer.deploy(Vulnerable, 10, 1000, 9999);
};
