import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"
import "@nomicfoundation/hardhat-verify"
import "./tasks/blocknumber"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@typechain/hardhat"



const SEPOLIA_URL= process.env.SEPOLIA_RPC_URL

const PRIVATE_KEY= process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY= process.env.ETHERSCAN_API_KEY


const config: HardhatUserConfig = {
    solidity: "0.8.19",
    defaultNetwork: "hardhat",
    networks: {
        Sepolia: {
            url: `${SEPOLIA_URL}`,
            accounts: [`${PRIVATE_KEY}`],
            chainId: 11155111,
        },
        Localhost: {
            url: "http://127.0.0.1:8545/",
            accounts: [
                "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
            ],
        },
    },
    etherscan: {
        apiKey: `${ETHERSCAN_API_KEY}`,
    },
    gasReporter:{
      enabled:true,
       currency:"USD",
       outputFile:"./file.txt",
       noColors:true
    }
}


export default config;
