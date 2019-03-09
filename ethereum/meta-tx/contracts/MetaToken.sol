pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract MetaToken is ERC20, ERC20Detailed {
  using ECDSA for bytes32;

  mapping (address => uint256) private _nonces;

  constructor(uint256 supply) ERC20Detailed("MetaToken", "MT", 18) public {
    _mint(msg.sender, supply);
  }

  function nonceOf(address owner) public view returns (uint256) {
    return _nonces[owner];
  }

  function metaTransfer(
      address from,
      address to,
      uint256 value,
      uint256 fee,
      uint256 nonce,
      address relayer,
      bytes memory sig
  ) public returns (bool) {
    require(msg.sender == relayer, "wrong relayer");
    require(nonceOf(from) == nonce, "invalid nonce");
    require(balanceOf(from) >= value.add(fee), "insufficient balance");

    bytes32 hash = metaTransferHash(from, to, value, fee, nonce, relayer);
    address signer = hash.toEthSignedMessageHash().recover(sig);
    require(signer == from, "signer != from");

    _transfer(from, to, value);
    _transfer(from, relayer, fee);
    _nonces[from]++;

    return true;
  }

  function metaTransferHash(
      address from,
      address to,
      uint256 value,
      uint256 fee,
      uint256 nonce,
      address relayer
  ) public view returns (bytes32) {
    return keccak256(
        abi.encodePacked(
            address(this),
            "metaTransfer",
            from,
            to,
            value,
            fee,
            nonce,
            relayer
        )
    );
  }
}
