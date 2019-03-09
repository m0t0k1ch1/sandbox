pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/cryptography/ECDSA.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract MetaToken is ERC20, ERC20Detailed {
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
      uint256[4] memory params, // nonce, gasPrice, gasLimit, tokenGasPrice
      address relayer,
      bytes memory sig
  ) public returns (bool) {
    uint256 initialGas = gasleft();

    require(relayer == msg.sender, "wrong relayer");
    require(nonceOf(from) == params[0], "invalid nonce");
    require(tx.gasprice == params[1], "gasPrice != requested gasPrice");
    require(initialGas >= params[2], "insufficient gas");
    require(balanceOf(from) >= value.add(params[2].mul(params[3])), "insufficient balance");

    bytes32 hash = metaTransferHash(from, to, value, params, relayer);
    address signer = ECDSA.recover(hash, sig);
    require(signer == from, "signer != from");

    _transfer(from, to, value);
    _transfer(from, relayer, initialGas - gasleft());
    _nonces[from]++;

    return true;
  }

  function metaTransferHash(
      address from,
      address to,
      uint256 value,
      uint256[4] memory params,
      address relayer
  ) public view returns (bytes32) {
    return keccak256(
        abi.encodePacked(
            address(this),
            "metaTransfer",
            from,
            to,
            value,
            params[0],
            params[1],
            params[2],
            params[3],
            relayer
        )
    );
  }
}
