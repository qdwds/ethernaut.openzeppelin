import { ethers } from "hardhat";
import colors from "colors";
colors;

const NAME = "Fallout"


const main = async () => {
    const Fallout = await ethers.getContractFactory(NAME);
    const fallout = await Fallout.deploy();
    await fallout.deployed();
    console.log(`fallout contract owner： ${await fallout.owner()}`.green);

    await fallout.Fal1out();
    console.log(`fallout contract owner： ${await fallout.owner()}`.green);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
