const ReentrancyVulnerable = artifacts.require('./ReentrancyVulnerable.sol');
const ReentrancyAttacker   = artifacts.require('./ReentrancyAttacker.sol');

module.exports = async (deployer) => {
  await deployer.deploy(ReentrancyVulnerable);
  let vulnerable = await ReentrancyVulnerable.deployed();
  await deployer.deploy(ReentrancyAttacker, vulnerable.address);
};
