const MetaToken = artifacts.require('MetaToken');
const BN        = web3.utils.BN;

module.exports = async (deployer) => {
  let supply = new BN(21000000).mul(new BN(10).pow(new BN(18)));
  await deployer.deploy(MetaToken, supply, {
    gas: 3000000
  });
};
