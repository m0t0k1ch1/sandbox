const Attacker   = artifacts.require('./Attacker.sol');
const Vulnerable = artifacts.require('./Vulnerable.sol');

module.exports = async (deployer) => {
  await deployer.deploy(Vulnerable);
  let vulnerable = await Vulnerable.deployed();
  await deployer.deploy(Attacker, vulnerable.address);
};
