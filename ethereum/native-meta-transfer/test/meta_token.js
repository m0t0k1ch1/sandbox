const MetaToken = artifacts.require('MetaToken');
const BN        = web3.utils.BN;

contract('MetaToken', async (accounts) => {
  it('transfer', async () => {
    let metaToken = await MetaToken.deployed();

    let frm    = accounts[0];
    let to     = accounts[1];
    let amount = new BN('100');

    let balanceOfFromBefore = await metaToken.balanceOf(frm);
    let balanceOfToBefore   = await metaToken.balanceOf(to);

    await metaToken.transfer(to, amount, {from: frm});

    let balanceOfFromAfter = await metaToken.balanceOf(frm);
    let balanceOfToAfter   = await metaToken.balanceOf(to);

    assert.isTrue(balanceOfFromBefore.sub(amount).eq(balanceOfFromAfter));
    assert.isTrue(balanceOfToBefore.add(amount).eq(balanceOfToAfter));
  });

  it('metaTransfer', async () => {
    let metaToken = await MetaToken.deployed();

    let frm     = accounts[0];
    let to      = accounts[1];
    let amount  = new BN('100');
    let fee     = new BN('1');
    let nonce   = new BN('0');
    let relayer = accounts[2];

    let hash = await metaToken.metaTransferHash(frm, to, amount, fee, nonce, relayer);
    let sig  = await web3.eth.sign(hash, frm);

    let balanceOfFromBefore    = await metaToken.balanceOf(frm);
    let balanceOfToBefore      = await metaToken.balanceOf(to);
    let balanceOfRelayerBefore = await metaToken.balanceOf(relayer);

    await metaToken.metaTransfer(frm, to, amount, fee, nonce, relayer, sig, {from: relayer});

    let balanceOfFromAfter    = await metaToken.balanceOf(frm);
    let balanceOfToAfter      = await metaToken.balanceOf(to);
    let balanceOfRelayerAfter = await metaToken.balanceOf(relayer);

    assert.isTrue(balanceOfFromBefore.sub(amount).sub(fee).eq(balanceOfFromAfter));
    assert.isTrue(balanceOfToBefore.add(amount).eq(balanceOfToAfter));
    assert.isTrue(balanceOfRelayerBefore.add(fee).eq(balanceOfRelayerAfter));
  });
});
