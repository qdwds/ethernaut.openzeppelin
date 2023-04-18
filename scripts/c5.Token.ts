import { ethers } from "hardhat";


const main = async () => {
    const [acc1,acc2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy("20");
    await token.deployed();
    console.log(await token.balanceOf(acc1.address));

    await token.transfer(acc2.address, 21);
    console.log(await token.balanceOf(acc1.address));
    console.log(await token.balanceOf(acc2.address));
}

main()
.catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
