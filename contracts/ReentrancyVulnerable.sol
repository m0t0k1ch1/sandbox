pragma solidity >0.4.99 <0.6.0;

contract ReentrancyVulnerable {
  mapping(address => uint256) private balances;

  function balanceOf(address _addr) public view returns(uint256) {
    return balances[_addr];
  }

  function deposit() payable public {
    require(balances[msg.sender] + msg.value >= balances[msg.sender]);
    balances[msg.sender] += msg.value;
  }

  function transfer(address _to, uint256 _amount) public {
    require(balances[msg.sender] >= _amount);
    require(balances[_to] + _amount >= balances[_to]);
    balances[msg.sender] -= _amount;
    balances[_to] += _amount;
  }

  // vulnerable
  function withdraw() public {
    bool ok;
    bytes memory data;
    (ok, data) = msg.sender.call.value(balances[msg.sender])(abi.encodePacked());
    require(ok);
    balances[msg.sender] = 0;
  }
}
