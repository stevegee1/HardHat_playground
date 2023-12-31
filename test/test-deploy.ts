/**
 * Test for our simplestorage smartcontract
 */
import { ethers } from "hardhat"
import {expect,assert} from "chai"
//import {Contract} from "ethers"
import {SimpleStorage, SimpleStorage__factory} from "../typechain-types"

describe("SimpleStorage", (): void => {
    let SimpleStorageFactory:SimpleStorage__factory

   let SimpleStorageDeploye:SimpleStorage
    beforeEach(async (): Promise<void> => {
         SimpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory
         SimpleStorageDeploye = await SimpleStorageFactory.deploy()
    }),
        it("It should start with a favorite number of zero",async ()=>{
            const currentValue=await SimpleStorageDeploye.retrieve()
            assert.equal(currentValue.toString(), "0")

        })
        it("The updated value should be equal to the expected value", async()=>{
            const expectedValue="7"
            const txn= await SimpleStorageDeploye.store(expectedValue)
            await txn.wait(1)
            const updatedValue= await SimpleStorageDeploye.retrieve()
             assert.equal(updatedValue.toString(), "7")
        })
        it("the argument passed must be equal to equal to the state variable value", async()=>{
            const txn= await SimpleStorageDeploye.addPerson("boy", 1)
            await txn.wait(1)
            const expectedValue= SimpleStorageDeploye.nameToFavoriteNumber("boy")
            assert.equal((await expectedValue).toString(),"1")

        })
        it("It should return the passed argument as the index 0 of the array People ", async()=>{
            const txn= await SimpleStorageDeploye.addPerson("girl",2)
            await txn.wait(1)
            const PeopleStruct= await SimpleStorageDeploye.people(0)
            assert.include(PeopleStruct,  BigInt(2))
            
        })
})
