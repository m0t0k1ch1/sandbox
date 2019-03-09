const Vulnerable = artifacts.require('Vulnerable');

contract('Vulnerable', async (accounts) => {
  it('success', async () => {
    let vulnerable = await Vulnerable.deployed();

    let purchaser = accounts[1];
    let balance;

    // purchase 100 token
    await vulnerable.purchase({from: purchaser, value: 100});

    balance = await vulnerable.balanceOf(purchaser);
    assert.equal(100, balance);

    // purchase 100 token
    await vulnerable.purchase({from: purchaser, value: 100});

    balance = await vulnerable.balanceOf(purchaser);
    assert.equal(200, balance);

    // purchase 100 token (trigger the overflow of balances[purchaser])
    await vulnerable.purchase({from: purchaser, value: 100});

    balance = await vulnerable.balanceOf(purchaser);
    assert.equal(44, balance);
  });
});
