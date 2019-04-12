const Factory = artifacts.require('Factory');

module.exports = async (deployer) => {
  await deployer.deploy(Factory);
};