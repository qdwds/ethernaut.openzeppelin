import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {version: "0.8.18"},
            {version: "0.6.0"}
        ]
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // mining: {
            //     auto: false,
            //     interval: [1000, 2000]
            //   }
        }
    }
};

export default config;
