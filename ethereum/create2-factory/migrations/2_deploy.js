const Burner  = artifacts.require('Burner');
const Factory = artifacts.require('Factory');

module.exports = async (deployer) => {
  await deployer.deploy(Burner);
  await deployer.deploy(Factory);
};
