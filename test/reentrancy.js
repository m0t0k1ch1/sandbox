const Vulnerable = artifacts.require('./reentrancy/Vulnerable.sol');
const Attacker   = artifacts.require('./reentrancy/Attacker.sol');

contract('Reentrancy', async (accounts) => {
  it("success: attack", async () => {
    let vulnerable = await Vulnerable.deployed();
    let attacker = await Attacker.deployed();

    let alice = accounts[0];
    let bob   = accounts[1];

    let balanceOfAlice;
    let balanceOfBob;
    let reserveAmount;

    // Alice: deposit 1 ETH
    await vulnerable.deposit({from: alice, value: 1000000000000000000});

    balanceOfAlice = await vulnerable.balanceOf(alice);
    assert.equal(1000000000000000000, balanceOfAlice);
    reserveAmount = await web3.eth.getBalance(vulnerable.address);
    assert.equal(1000000000000000000, reserveAmount);

    // Bob: set up the attacker contract
    await attacker.setOwner(bob);

    for (var i = 0; i < 10; i++) {
      // Bob: deposit 0.1 ETH
      await attacker.deposit({from: bob, value: 100000000000000000});

      // Bob: withdraw and transfer 0.1 ETH
      await attacker.withdraw({from: bob});
    }

    balanceOfBob = await vulnerable.balanceOf(bob);
    assert.equal(1000000000000000000, balanceOfBob);

    // Bob: withdraw 1 ETH
    await vulnerable.withdraw({from: bob});

    reserveAmount = await web3.eth.getBalance(vulnerable.address);
    assert.equal(0, reserveAmount);
  });
});
