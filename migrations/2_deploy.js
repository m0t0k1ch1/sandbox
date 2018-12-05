const Overflowable         = artifacts.require('./Overflowable.sol');
const ReentrancyVulnerable = artifacts.require('./ReentrancyVulnerable.sol');
const ReentrancyAttacker   = artifacts.require('./ReentrancyAttacker.sol');
const StorageManipulatable = artifacts.require('./StorageManipulatable.sol');

module.exports = async (deployer) => {
  await deployer.deploy(Overflowable, 100, 100);
  await deployer.deploy(ReentrancyVulnerable);
  let vulnerable = await ReentrancyVulnerable.deployed();
  await deployer.deploy(ReentrancyAttacker, vulnerable.address);
  await deployer.deploy(StorageManipulatable, 10, 9999);
};
