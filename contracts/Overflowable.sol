pragma solidity >0.4.99 <0.6.0;

contract Overflowable {
  address public owner;
  uint256 public unitPrice;
  uint8 public unitAmount;
  mapping(address => uint8) private balances;

  constructor(uint256 _unitPrice, uint8 _unitAmount) public {
    owner = msg.sender;
    unitPrice = _unitPrice;
    unitAmount = _unitAmount;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  // vulnerable
  function purchase() payable public {
    require(msg.value == unitPrice);
    balances[msg.sender] += unitAmount;
  }

  function balanceOf(address _addr) public view returns(uint8) {
    return balances[_addr];
  }

  function withdraw() public onlyOwner {
    msg.sender.transfer(address(this).balance);
  }
}
