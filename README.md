# 智能合约安全
在这个项目中，我将会录制一系列智能合约solidity中的安全闯关课程相关内容以及如何去修改对应代码保证合约的安全。
## Fallack
挑战获得Fallack合约的所有权，并且把他的额度减到0;
+ contribute: 调用`contribute`由于部署时候设置的ETH非常多，用户调用时候`contribute`传入的非常少，这样会加的成本。不过本项目目标是找到所有漏洞，所以就修改了一下值，模拟两个漏洞。
+ receive: 查看`receive`的时候发现合约中只要有ETH并且传入给合约传入ETH就能修改`msg.sender`地址。
## Fallout
