const Account = artifacts.require('Account');
const Burner  = artifacts.require('Burner');
const Factory = artifacts.require('Factory');

contract('Factory', async (accounts) => {
  // Account.sol
  let bytecode = '0x608060405234801561001057600080fd5b506040516020806104418339810180604052602081101561003057600080fd5b8101908080519060200190929190505050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506103b0806100916000396000f3fe60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680638da5cb5b1461004e5780639e5d4c49146100a5575b005b34801561005a57600080fd5b50610063610197565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100b157600080fd5b50610195600480360360608110156100c857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561010f57600080fd5b82018360208201111561012157600080fd5b8035906020019184600183028401116401000000008311171561014357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506101bc565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561021757600080fd5b600060608473ffffffffffffffffffffffffffffffffffffffff1684846040518082805190602001908083835b6020831015156102695780518252602082019150602081019050602083039250610244565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d80600081146102cb576040519150601f19603f3d011682016040523d82523d6000602084013e6102d0565b606091505b50915091507f0fb6775dc1981e714851ec9511c68453c509a3e8c85f97a4f4d1185bf2bdbf7a8282604051808315151515815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610342578082015181840152602081019050610327565b50505050905090810190601f16801561036f5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a1505050505056fea165627a7a7230582059d70ebae3163aa0ec51955f3283cfeb47f0e03ace9adc5926e0f83396797f340029'

  it('deploy', async () => {
    let burner  = await Burner.deployed();
    let factory = await Factory.deployed();

    let owner = accounts[0];

    let salt = 0;
    let code = `${bytecode}${web3.eth.abi.encodeParameter('address', owner).slice(2)}`
    let expectedAddress = buildCreate2Address(factory.address, salt, code);

    await web3.eth.sendTransaction({
      from: owner,
      to: expectedAddress,
      value: web3.utils.toWei('1', 'ether'),
    });

    let result = await factory.deploy(code, salt, {from: owner});
    let deployedAddress = result.logs.filter(log => log.event === 'Deployed')[0].args.addr.toLowerCase();
    assert.isTrue(await isContract(deployedAddress));
    assert.equal(expectedAddress, deployedAddress);

    let account = await Account.at(deployedAddress);

    let burnerInstance = new web3.eth.Contract(Burner.abi, burner.address);
    let data = burnerInstance.methods.burn().encodeABI();

    await account.executeCall(burner.address, web3.utils.toWei('1', 'ether'), data, {from: owner});
    assert.equal(web3.utils.toWei('1', 'ether'), await web3.eth.getBalance(burner.address));
  });
});

function buildCreate2Address(creatorAddress, salt, code) {
  let saltHex = salt.toString(16);
  return `0x${web3.utils.sha3(`0x${[
    'ff',
    creatorAddress,
    `0x${'0'.repeat(64 - saltHex.length)}${saltHex}`,
    web3.utils.sha3(code)
  ].map(x => x.replace(/0x/, '')).join('')}`).slice(-40)}`.toLowerCase();
}

async function isContract(address) {
  const code = await web3.eth.getCode(address);
  return code.slice(2).length > 0;
}
