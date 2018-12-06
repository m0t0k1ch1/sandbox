pragma solidity >0.4.99 <0.6.0;

contract StorageManipulatable {
  address public owner;
  uint256 public codesNumMax;
  uint256 public codeValueMin;
  uint256 public codeValueMax;
  uint256[] public codes;

  constructor(uint256 _codesNumMax, uint256 _codeValueMin, uint256 _codeValueMax) public {
    owner = msg.sender;
    codesNumMax  = _codesNumMax;
    codeValueMin = _codeValueMin;
    codeValueMax = _codeValueMax;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier validCode(uint256 _code) {
    require(codeValueMin <= _code && _code <= codeValueMax);
    _;
  }

  function pushCode(uint256 _code) public onlyOwner validCode(_code) {
    require(codes.length < codesNumMax);
    codes.push(_code);
  }

  // vulnerable
  function popCode() public onlyOwner {
    require(codes.length >=0);
    codes.length--;
  }

  function updateCode(uint256 _index, uint256 _code) public onlyOwner validCode(_code) {
    require(_index < codes.length);
    codes[_index] = _code;
  }
}
