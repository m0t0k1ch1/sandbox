const MetaToken = artifacts.require('MetaToken');
const BN        = web3.utils.BN;

contract('MetaToken', async (accounts) => {
  it('transfer', async () => {
    let metaToken = await MetaToken.deployed();

    let from  = accounts[0];
    let to    = accounts[1];
    let value = new BN('1');

    let balanceOfFromBefore = await metaToken.balanceOf(from);
    let balanceOfToBefore   = await metaToken.balanceOf(to);

    await metaToken.transfer(to, value, {from: from});

    let balanceOfFromAfter = await metaToken.balanceOf(from);
    let balanceOfToAfter   = await metaToken.balanceOf(to);

    assert.equal(true, balanceOfFromBefore.sub(value).eq(balanceOfFromAfter));
    assert.equal(true, balanceOfToBefore.add(value).eq(balanceOfToAfter));
  });
});
