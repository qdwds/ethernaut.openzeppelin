// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "hardhat/console.sol";
/**
 * 你最开始有20个 token, 如果你通过某种方法可以增加你手中的 token 数量,你就可以通过这一关,当然越多越好
 */

contract Token {

  mapping(address => uint) balances;
  uint public totalSupply;

  constructor(uint _initialSupply) public {
    balances[msg.sender] = totalSupply = _initialSupply;
  }

  function transfer(address _to, uint _value) public returns (bool) {
    /**
     * 20 - 20 == 0
     * 20 - 100 == 2 ** 256 - 1 - 80
     */
    require(balances[msg.sender] - _value >= 0);
    console.log(balances[msg.sender] - _value);
    console.log(balances[msg.sender]);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    console.log(balanceOf(msg.sender));
    console.log(balanceOf(_to));
    return true;
  }

  function balanceOf(address _owner) public view returns (uint balance) {
    return balances[_owner];
  }
}
