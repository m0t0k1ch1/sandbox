const Overflowable = artifacts.require('./Overflowable.sol');

contract('Overflow', async (accounts) => {
  it('success', async () => {
    let overflowable = await Overflowable.deployed();

    let purchaser = accounts[0];
    let balance;

    // purchase 100 token
    await overflowable.purchase({from: purchaser, value: 100});

    balance = await overflowable.balanceOf(purchaser);
    assert.equal('100', balance.toString());

    // purchase 100 token
    await overflowable.purchase({from: purchaser, value: 100});

    balance = await overflowable.balanceOf(purchaser);
    assert.equal('200', balance.toString());

    // purchase 100 token
    await overflowable.purchase({from: purchaser, value: 100});

    balance = await overflowable.balanceOf(purchaser);
    assert.equal('44', balance.toString());
  });
});
