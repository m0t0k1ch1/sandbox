pragma solidity >0.4.99 <0.6.0;

contract Account {
  event Executed(bool success, bytes returndata);

  address public owner;

  constructor(address _owner) public {
    owner = _owner;
  }

  function () external payable {}

  function executeCall(
    address to,
    uint256 value,
    bytes memory data
  ) public {
    require(msg.sender == owner);
    (bool success, bytes memory returndata) = to.call.value(value)(data);
    emit Executed(success, returndata);
  }
}
