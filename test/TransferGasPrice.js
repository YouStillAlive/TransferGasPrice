const { expect } = require("chai")
const { constants } = require("ethers")

describe("TransferGasPrice", function () {
    let transferGasPrice
    let token, owner
    const amount = 100
    const iterations = 5

    beforeEach(async function () {
        ;[owner] = await ethers.getSigners()
        const TransferGasPrice = await ethers.getContractFactory("TransferGasPrice")
        transferGasPrice = await TransferGasPrice.deploy()
        await transferGasPrice.deployed()

        const ERC20Token = await ethers.getContractFactory("ERC20Token")
        token = await ERC20Token.deploy("TEST Token", "TERC20")
        await token.deployed()
        await token.approve(transferGasPrice.address, constants.MaxUint256)
    })

    it("should return the gas price for single transfer in", async function () {
        const gasPrice = await transferGasPrice
            .connect(owner)
            .callStatic.getSingleTransferInGasPrice(token.address, amount)
        console.log("Gas Price for Single Poolz Transfer In:", gasPrice.toString())
    })

    it("should log the gas price for multiply transfer in", async function () {
        await logMultiplyTransferInGasPrice(token.address, amount, iterations)
        await logMultiplyTransferInGasPrice(token.address, amount, 10)
        await logMultiplyTransferInGasPrice(token.address, amount, 100)
    })

    it("should log the gas price for single transfer from", async function () {
        let gasPrice = await transferGasPrice
            .connect(owner)
            .callStatic.getSingleTransferFromGasPrice(token.address, amount)
        console.log("Gas Price for Single ERC20 Transfer From:", gasPrice.toString())
    })

    it("should log the gas price for multiply transfer from", async function () {
        await logMultiplyTransferFromGasPrice(token.address, amount, iterations)
        await logMultiplyTransferFromGasPrice(token.address, amount, 10)
        await logMultiplyTransferFromGasPrice(token.address, amount, 100)
    })

    async function logMultiplyTransferFromGasPrice(token, amount, iterations) {
        const gasPrice = await transferGasPrice
            .connect(owner)
            .callStatic.getMultiplyTransferFromGasPrice(token, amount, iterations)
        console.log("Gas Price for " + iterations + " iterations ERC20 Transfer From:", gasPrice.toString())
    }

    async function logMultiplyTransferInGasPrice(token, amount, iterations) {
        const gasPrice = await transferGasPrice
            .connect(owner)
            .callStatic.getMultiplyTransferInGasPrice(token, amount, iterations)
        console.log("Gas Price for " + iterations + " iterations Poolz Transfer In:", gasPrice.toString())
    }
})
