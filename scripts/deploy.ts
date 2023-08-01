//imports


import {ethers, run, network} from "hardhat"

//call main function
async function main():Promise<void>{
   const SimpleStorageFactory= await ethers.getContractFactory("SimpleStorage")

   console.log("Deploying contracts...")
   const SimpleStorage= await SimpleStorageFactory.deploy()
   console.log(`${SimpleStorage.target}`)

   console.log("#####################")
  
  if(network.config.chainId === 1155111 && process.env.ETHERSCAN_API_KEY ){
    await SimpleStorage.deploymentTransaction()?.wait(6)
    await verify(`${SimpleStorage.target}`)
  }
   
/**
 * Interacting with the contract methods
 */

  //calling retrieve function
  const currentValue= await SimpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)

  //calling store function
  const storeValueTxn= await SimpleStorage.store(7)
  await storeValueTxn.wait(1)
  const storeValue= await SimpleStorage.retrieve()
  console.log(`Updated value: ${storeValue}`)


}

//Verify programmatically
async function verify(contractAddress:string){

    console.log("verifying contract...")
    try {
         await run("verify:verify",{
        address:contractAddress,
        constructorArguments:[]

    })
    } catch (error:unknown) {
       if(typeof error === "object" && error != null && "message " in error){
         const errorMessage= (error as {message:unknown}).message
         if(typeof errorMessage ==="string" &&  errorMessage.toLocaleLowerCase().includes("already verified")){
            console.log("Contract already verified")
         }
         else
         {
            console.log(errorMessage)
         }
       }
       else
       {
        console.error(error)
       }
        
    }
   
    
}



//catch any error
main().then(()=>{process.exit(0)}).catch((error)=>{
    console.error(error)
    process.exit(1)
})
