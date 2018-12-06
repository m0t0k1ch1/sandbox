const Overflowable         = artifacts.require('./Overflowable.sol');
const ReentrancyVulnerable = artifacts.require('./ReentrancyVulnerable.sol');
const ReentrancyAttacker   = artifacts.require('./ReentrancyAttacker.sol');
const StorageManipulatable = artifacts.require('./StorageManipulatable.sol');

module.exports = async (deployer) => {
  await deployer.deploy(Overflowable, 100, 100);
  await deployer.deploy(ReentrancyVulnerable);
  let reentrancyVulnerable = await ReentrancyVulnerable.deployed();
  await deployer.deploy(ReentrancyAttacker, reentrancyVulnerable.address);
  await deployer.deploy(StorageManipulatable, 10, 1000, 9999);
};
