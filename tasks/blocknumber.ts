import { task } from "hardhat/config";
//mport { hrtime } from "process";
//import {ethers} from "hardhat"
interface contractAddress{
    account:string
}

task("balance", "prints account balance")
    .addParam("account", "The account's address")
    .setAction(async (contractAddress:contractAddress, hre) => {
    
     const balance= await hre.ethers.provider.getBalance(contractAddress.account)
     console.log(hre.ethers.formatEther(balance), "ETH")
    })
