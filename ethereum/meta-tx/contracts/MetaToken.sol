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
      address frm,
      address to,
      uint256 amount,
      uint256 fee,
      uint256 nonce,
      address relayer,
      bytes memory sig
  ) public returns (bool) {
    require(msg.sender == relayer, "wrong relayer");
    require(nonceOf(frm) == nonce, "invalid nonce");
    require(balanceOf(frm) >= amount.add(fee), "insufficient balance");

    bytes32 hash = metaTransferHash(frm, to, amount, fee, nonce, relayer);
    address signer = hash.toEthSignedMessageHash().recover(sig);
    require(signer == frm, "signer != frm");

    _transfer(frm, to, amount);
    _transfer(frm, relayer, fee);
    _nonces[frm]++;

    return true;
  }

  function metaTransferHash(
      address frm,
      address to,
      uint256 amount,
      uint256 fee,
      uint256 nonce,
      address relayer
  ) public view returns (bytes32) {
    return keccak256(
        abi.encodePacked(
            address(this),
            "metaTransfer",
            frm,
            to,
            amount,
            fee,
            nonce,
            relayer
        )
    );
  }
}
