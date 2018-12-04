const Vulnerable = artifacts.require('./reentrancy/Vulnerable.sol');
const Attacker   = artifacts.require('./reentrancy/Attacker.sol');

module.exports = async (deployer) => {
  await deployer.deploy(Vulnerable);
  let vulnerable = await Vulnerable.deployed();
  await deployer.deploy(Attacker, vulnerable.address);
};
