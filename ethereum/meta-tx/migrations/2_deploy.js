const MetaToken = artifacts.require('MetaToken');

module.exports = async (deployer) => {
  await deployer.deploy(MetaToken, web3.utils.toBN('21000000e18'), {
    gas: 2000000
  });
};
