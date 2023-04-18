import { ethers } from "hardhat";
import colors from "colors";
colors;

const CoinFlipName = "CoinFlip"
const GuessFlipName = "GuessFlip"


const main = async () => {
    const CoinFlip = await ethers.getContractFactory(CoinFlipName);
    const coinFlip = await CoinFlip.deploy();
    await coinFlip.deployed();
    console.log(coinFlip.address);

   
    const GuessFlip = await ethers.getContractFactory(GuessFlipName);
    const guessFlip = await GuessFlip.deploy(coinFlip.address);
    await guessFlip.deployed();
    console.log(guessFlip.address);

    for (let i = 0; i < 10; i++) {
        await guessFlip.guess({gasLimit:3000000});
        console.log(await coinFlip.consecutiveWins())
    }
    
}

main()
.catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
