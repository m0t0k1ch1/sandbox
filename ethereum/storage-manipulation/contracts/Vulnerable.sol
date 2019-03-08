pragma solidity >=0.4.21 <0.6.0;

contract Vulnerable {
  address private _owner;
  uint256 private _codesNumMax;
  uint256 private _codeValueMin;
  uint256 private _codeValueMax;

  uint256[] public _codes;

  modifier onlyOwner() {
    require(msg.sender == _owner);
    _;
  }

  modifier validCode(uint256 code) {
    require(_codeValueMin <= code && code <= _codeValueMax);
    _;
  }

  constructor(uint256 codesNumMax, uint256 codeValueMin, uint256 codeValueMax) public {
    _owner = msg.sender;
    _codesNumMax  = codesNumMax;
    _codeValueMin = codeValueMin;
    _codeValueMax = codeValueMax;
  }

  function codesNumMax() public view returns (uint256) {
    return _codesNumMax;
  }

  function codeValueMin() public view returns (uint256) {
    return _codeValueMin;
  }

  function codeValueMax() public view returns (uint256) {
    return _codeValueMax;
  }

  function codeAt(uint256 index) public view returns (uint256) {
    return _codes[index];
  }

  function pushCode(uint256 code) public onlyOwner validCode(code) {
    require(_codes.length < _codesNumMax);
    _codes.push(code);
  }

  // vulnerable
  function popCode() public onlyOwner {
    require(_codes.length >=0);
    _codes.length--;
  }

  function updateCode(uint256 index, uint256 code) public onlyOwner validCode(code) {
    require(index < _codes.length);
    _codes[index] = code;
  }
}
