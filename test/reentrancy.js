const ReentrancyVulnerable = artifacts.require('./ReentrancyVulnerable.sol');
const ReentrancyAttacker   = artifacts.require('./ReentrancyAttacker.sol');

contract('Reentrancy', async (accounts) => {
  it('success', async () => {
    let vulnerable = await ReentrancyVulnerable.deployed();
    let attacker   = await ReentrancyAttacker.deployed();

    let alice = accounts[0];
    let bob   = accounts[1];

    let balanceOfAlice;
    let balanceOfBob;
    let reserveAmount;

    // Alice: deposit 1 ETH
    await vulnerable.deposit({from: alice, value: web3.utils.toWei('1', 'ether')});

    balanceOfAlice = await vulnerable.balanceOf(alice);
    assert.equal(web3.utils.toWei('1', 'ether'), balanceOfAlice);
    reserveAmount = await web3.eth.getBalance(vulnerable.address);
    assert.equal(web3.utils.toWei('1', 'ether'), reserveAmount);

    // Bob: set up the attacker contract
    await attacker.setOwner(bob);

    for (var i = 0; i < 10; i++) {
      // Bob: deposit 0.1 ETH
      await attacker.deposit({from: bob, value: web3.utils.toWei('0.1', 'ether')});

      // Bob: withdraw and transfer 0.1 ETH
      await attacker.withdraw({from: bob});
    }

    balanceOfBob = await vulnerable.balanceOf(bob);
    assert.equal(web3.utils.toWei('1', 'ether'), balanceOfBob);

    // Bob: withdraw 1 ETH
    await vulnerable.withdraw({from: bob});

    reserveAmount = await web3.eth.getBalance(vulnerable.address);
    assert.equal(0, reserveAmount);
  });
});
