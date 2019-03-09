const MetaToken = artifacts.require('MetaToken');
const BN        = web3.utils.BN;

contract('MetaToken', async (accounts) => {
  it('transfer', async () => {
    let metaToken = await MetaToken.deployed();

    let from  = accounts[0];
    let to    = accounts[1];
    let value = new BN('100');

    let balanceOfFromBefore = await metaToken.balanceOf(from);
    let balanceOfToBefore   = await metaToken.balanceOf(to);

    await metaToken.transfer(to, value, {from: from});

    let balanceOfFromAfter = await metaToken.balanceOf(from);
    let balanceOfToAfter   = await metaToken.balanceOf(to);

    assert.isTrue(balanceOfFromBefore.sub(value).eq(balanceOfFromAfter));
    assert.isTrue(balanceOfToBefore.add(value).eq(balanceOfToAfter));
  });

  it('metaTransfer', async () => {
    let metaToken = await MetaToken.deployed();

    let from    = accounts[0];
    let to      = accounts[1];
    let value   = new BN('100');
    let fee     = new BN('1');
    let nonce   = new BN('0');
    let relayer = accounts[2];

    let hash = await metaToken.metaTransferHash(from, to, value, fee, nonce, relayer);
    let sig  = await web3.eth.sign(hash, from);

    let balanceOfFromBefore    = await metaToken.balanceOf(from);
    let balanceOfToBefore      = await metaToken.balanceOf(to);
    let balanceOfRelayerBefore = await metaToken.balanceOf(relayer);

    await metaToken.metaTransfer(from, to, value, fee, nonce, relayer, sig, {from: relayer});

    let balanceOfFromAfter    = await metaToken.balanceOf(from);
    let balanceOfToAfter      = await metaToken.balanceOf(to);
    let balanceOfRelayerAfter = await metaToken.balanceOf(relayer);

    assert.isTrue(balanceOfFromBefore.sub(value).sub(fee).eq(balanceOfFromAfter));
    assert.isTrue(balanceOfToBefore.add(value).eq(balanceOfToAfter));
    assert.isTrue(balanceOfRelayerBefore.add(fee).eq(balanceOfRelayerAfter));
  });
});
