const Vulnerable = artifacts.require('Vulnerable');

module.exports = async (deployer) => {
  await deployer.deploy(Vulnerable, 10, 1000, 9999);
};
