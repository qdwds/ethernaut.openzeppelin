import { ethers } from "hardhat";
import colors from "colors";
colors;


const main = async () => {
    const Telephone = await ethers.getContractFactory("Telephone");
    const telephone = await Telephone.deploy();
    await telephone.deployed();
    console.log(telephone.address);


    const AttactTelephone = await ethers.getContractFactory("AttactTelephone");
    const attactTelephone = await AttactTelephone.deploy(telephone.address);
    await attactTelephone.deployed();
    
    await attactTelephone.attactChangeOwner("0x71bE63f3384f5fb98995898A86B02Fb2426c5788");
}

main()
.catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
