pragma solidity >0.4.99 <0.6.0;

contract StorageManipulatable {
  uint256 public codesNumMax;
  uint256 public codeValueMax;
  uint256[] public codes;

  constructor(uint256 _codesNumMax, uint256 _codeValueMax) public {
    codesNumMax  = _codesNumMax;
    codeValueMax = _codeValueMax;
  }

  function pushCode(uint256 _code) public {
    require(codes.length < codesNumMax && _code <= codeValueMax);
    codes.push(_code);
  }

  function popCode() public {
    require(codes.length >=0);
    codes.length--;
  }

  function updateCode(uint256 _index, uint256 _code) public {
    require(_index < codes.length && _code <= codeValueMax);
    codes[_index] = _code;
  }
}
