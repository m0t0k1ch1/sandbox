const Vulnerable = artifacts.require('Vulnerable');

module.exports = async (deployer) => {
  await deployer.deploy(Vulnerable, 100, 100);
};
