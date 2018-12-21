pragma solidity >0.4.99 <0.6.0;

contract ReentrancyVulnerable {
  mapping(address => uint256) private _balances;

  function balanceOf(address who) public view returns(uint256) {
    return _balances[who];
  }

  function deposit() payable public {
    require(_balances[msg.sender] + msg.value >= _balances[msg.sender]);
    _balances[msg.sender] += msg.value;
  }

  function transfer(address to, uint256 value) public {
    require(_balances[msg.sender] >= value);
    require(_balances[to] + value >= _balances[to]);
    _balances[msg.sender] -= value;
    _balances[to] += value;
  }

  // vulnerable
  function withdraw() public {
    (bool success,) = msg.sender.call.value(_balances[msg.sender])(abi.encodePacked());
    require(success);
    _balances[msg.sender] = 0;
  }
}
