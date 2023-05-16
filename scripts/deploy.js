const hre = require("hardhat")

async function main() {
    // Get the contract factory
    const TransferInGasPrice = await hre.ethers.getContractFactory("TransferInGasPrice")

    // Deploy the contract
    const transferGasPrice = await TransferInGasPrice.deploy()

    // Wait for the contract to be mined
    await transferGasPrice.deployed()

    console.log("Contract deployed to:", transferGasPrice.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
