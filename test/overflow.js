const Overflowable = artifacts.require('./Overflowable.sol');

contract('Overflow', async (accounts) => {
  it('success', async () => {
    let overflowable = await Overflowable.deployed();

    let purchaser = accounts[1];
    let balance;

    // purchase 100 token
    await overflowable.purchase({from: purchaser, value: 100});

    balance = await overflowable.balanceOf(purchaser);
    assert.equal(100, balance);

    // purchase 100 token
    await overflowable.purchase({from: purchaser, value: 100});

    balance = await overflowable.balanceOf(purchaser);
    assert.equal(200, balance);

    // purchase 100 token (trigger the overflow of balances[purchaser])
    await overflowable.purchase({from: purchaser, value: 100});

    balance = await overflowable.balanceOf(purchaser);
    assert.equal(44, balance);
  });
});
