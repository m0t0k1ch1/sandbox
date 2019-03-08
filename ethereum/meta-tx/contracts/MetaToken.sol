pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract MetaToken is ERC20, ERC20Detailed {
  constructor(uint256 supply) ERC20Detailed("MetaToken", "MT", 18) public {
    _mint(msg.sender, supply);
  }
}
