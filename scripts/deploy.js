const hre = require("hardhat")

async function main() {
    // Get the contract factory
    const TransferGasPrice = await hre.ethers.getContractFactory("TransferGasPrice")

    // Deploy the contract
    const transferGasPrice = await TransferGasPrice.deploy()

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
