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

  it('metaTransfer', async () => {
    let metaToken = await MetaToken.deployed();

    let nonce         = new BN('0');
    let gasPrice      = web3.utils.toWei(new BN('1'), 'gwei');
    let gasLimit      = new BN('100000');
    let tokenGasPrice = new BN('1');

    let from    = accounts[0];
    let to      = accounts[1];
    let value   = new BN('1');
    let params  = [nonce, gasPrice, gasLimit, tokenGasPrice];
    let relayer = accounts[2];

    let hash = await metaToken.metaTransferHash(from, to, value, params, relayer);
    let sig  = await web3.eth.sign(hash, from);

    let balanceOfFromBefore    = await metaToken.balanceOf(from);
    let balanceOfToBefore      = await metaToken.balanceOf(to);
    let balanceOfRelayerBefore = await metaToken.balanceOf(relayer);

    await metaToken.metaTransfer(from, to, value, params, relayer, sig, {
      from: relayer,
      gasPrice: gasPrice
    });

    let balanceOfFromAfter    = await metaToken.balanceOf(from);
    let balanceOfToAfter      = await metaToken.balanceOf(to);
    let balanceOfRelayerAfter = await metaToken.balanceOf(relayer);

    let fee = balanceOfRelayerAfter.sub(balanceOfRelayerBefore);

    assert.equal(true, balanceOfFromBefore.sub(value).sub(fee).eq(balanceOfFromAfter));
    assert.equal(true, balanceOfToBefore.add(value).eq(balanceOfToAfter));
  });
});
