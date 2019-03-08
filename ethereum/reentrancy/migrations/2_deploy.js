const Attacker   = artifacts.require('Attacker');
const Vulnerable = artifacts.require('Vulnerable');

module.exports = async (deployer) => {
  await deployer.deploy(Vulnerable);
  let vulnerable = await Vulnerable.deployed();
  await deployer.deploy(Attacker, vulnerable.address);
};
