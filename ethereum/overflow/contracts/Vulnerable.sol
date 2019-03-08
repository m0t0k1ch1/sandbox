pragma solidity >=0.4.21 <0.6.0;

contract Vulnerable {
  address private _owner;
  uint256 private _unitPrice;
  uint8 private _unitAmount;

  mapping(address => uint8) private _balances;

  modifier onlyOwner {
    require(msg.sender == _owner);
    _;
  }

  constructor(uint256 unitPrice, uint8 unitAmount) public {
    _owner = msg.sender;
    _unitPrice = unitPrice;
    _unitAmount = unitAmount;
  }

  function unitPrice() public view returns (uint256) {
    return _unitPrice;
  }

  function unitAmount() public view returns (uint8) {
    return _unitAmount;
  }

  function balanceOf(address who) public view returns (uint8) {
    return _balances[who];
  }

  // vulnerable
  function purchase() payable public {
    require(msg.value == _unitPrice);
    _balances[msg.sender] += _unitAmount;
  }

  function withdraw() public onlyOwner {
    msg.sender.transfer(address(this).balance);
  }
}
