const Vulnerable = artifacts.require('./reentrancy/Vulnerable.sol');
const Attacker   = artifacts.require('./reentrancy/Attacker.sol');

contract('Reentrancy', async (accounts) => {
  it("success: attack", async () => {
    let vulnerable = await Vulnerable.deployed();
    let attacker = await Attacker.deployed();

    let alice = accounts[0];
    let bob   = accounts[1];

    let balanceOfAlice;
    let balanceOfAttacker;
    let reserveAmount;
    let withdrawnAmount;

    // Alice: deposit 1 ETH
    await vulnerable.deposit({from: alice, value: 1000000000000000000});
    balanceOfAlice = await vulnerable.balanceOf(alice);
    assert.equal(1000000000000000000, balanceOfAlice);
    reserveAmount = await web3.eth.getBalance(vulnerable.address);
    assert.equal(1000000000000000000, reserveAmount);

    // Bob: deposit 0.1 ETH
    await attacker.deposit({from: bob, value: 100000000000000000});
    balanceOfAttacker = await vulnerable.balanceOf(attacker.address);
    assert.equal(100000000000000000, balanceOfAttacker);
    reserveAmount = await web3.eth.getBalance(vulnerable.address);
    assert.equal(1100000000000000000, reserveAmount);

    // Bob: attack (withdraw 1.1 ETH)
    await attacker.attack({from: bob});
    balanceOfAttacker = await vulnerable.balanceOf(attacker.address);
    assert.equal(0, balanceOfAttacker);
    reserveAmount = await web3.eth.getBalance(vulnerable.address);
    assert.equal(0, reserveAmount);
    withdrawnAmount = await web3.eth.getBalance(attacker.address);
    assert.equal(1100000000000000000, withdrawnAmount);
  });
});
