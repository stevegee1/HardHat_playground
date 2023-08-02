//imports

import { BytesLike, HexString } from "ethers/lib.commonjs/utils/data"
import { ethers, run, network } from "hardhat"
// import {
//     SimpleStorage,
//     SimpleStorage__factory
// } from "../typechain-types"

//call main function
async function main(): Promise<void> {
    let SimpleStorageFactory: any
    let SimpleStorage: any
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

    console.log("Deploying contracts...")
    SimpleStorage = await SimpleStorageFactory.deploy()
    console.log(`${SimpleStorage.target}`)

    console.log("#####################")

    if (network.config.chainId === 1155111 && process.env.ETHERSCAN_API_KEY) {
        await SimpleStorage.deploymentTransaction()?.wait(10)
        await verify(`${SimpleStorage.target}`)
    }

    /**
     * Interacting with the contract methods
     */

    //   //calling retrieve function
    let currentValue = await SimpleStorage.retrieve()
    console.log(currentValue.toString())

    //calling store function
    const storeValueTxn = await SimpleStorage.store(7)
    await storeValueTxn.wait(1)
    const storeValue = await SimpleStorage.retrieve()
    console.log(storeValue.toString())
}

//Verify programmatically
async function verify(contractAddress: string) {
    console.log("verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: [],
        })
    } catch (error: unknown) {
        if (typeof error === "object" && error != null && "message " in error) {
            const errorMessage = (error as { message: unknown }).message
            if (
                typeof errorMessage === "string" &&
                errorMessage.toLowerCase().includes("already verified")
            ) {
                console.log("Contract already verified")
            } else {
                console.log(errorMessage)
            }
        } else {
            console.error(error)
        }
    }
}

//catch any error
main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
