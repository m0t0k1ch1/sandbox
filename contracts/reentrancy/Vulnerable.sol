pragma solidity >0.4.99 <0.6.0;

contract Vulnerable {
  mapping (address => uint256) private balances;

  function balanceOf(address _addr) public view returns(uint256) {
    return balances[_addr];
  }

  function deposit() payable public {
    balances[msg.sender] = msg.value;
  }

  function withdraw() public {
    uint amount = balances[msg.sender];

    bool ok;
    bytes memory data;
    (ok, data) = msg.sender.call.value(amount)(abi.encodePacked());
    require(ok);

    balances[msg.sender] = 0;
  }
}
