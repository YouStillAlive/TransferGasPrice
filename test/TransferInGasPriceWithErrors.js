const { expect } = require("chai")

describe("TransferInGasPriceWithErrors\n", function () {
    let transferInGasPrice
    let token, owner
    const amount = 100

    beforeEach(async function () {
        ;[owner] = await ethers.getSigners()
        const TransferInGasPrice = await ethers.getContractFactory("TransferInGasPriceWithErrors")
        transferInGasPrice = await TransferInGasPrice.deploy()
        await transferInGasPrice.deployed()

        const ERC20Token = await ethers.getContractFactory("ERC20Token") // Replace with the actual ERC20 token contract name
        token = await ERC20Token.deploy("TEST Token", "TERC20")
        await token.deployed()
        await token.approve(transferInGasPrice.address, ethers.constants.MaxUint256)
    })

    it("should check the gas price for single transfer in", async function () {
        await logSingleTransferInGasPrice(token.address, 1)
        await logSingleTransferInGasPrice(token.address, 5)
        await logSingleTransferInGasPrice(token.address, 10)
        await logSingleTransferInGasPrice(token.address, 50)
        await logSingleTransferInGasPrice(token.address, 100)
    })

    it("should check the gas price for multiply transfer in", async function () {
        await logMultiplyTransferInGasPrice(token.address, amount, 1)
        await logMultiplyTransferInGasPrice(token.address, amount, 5)
        await logMultiplyTransferInGasPrice(token.address, amount, 10)
        await logMultiplyTransferInGasPrice(token.address, amount, 50)
        await logMultiplyTransferInGasPrice(token.address, amount, 100)
    })

    async function logSingleTransferInGasPrice(token, amountsLength) {
        const amounts = []
        for (let i = 0; i < amountsLength; i++) {
            amounts.push(amount)
        }
        const gasPrice = await transferInGasPrice.connect(owner).callStatic.getSingleTransferInGasPrice(token, amounts)
        console.log(
            "Error: Gas Price for Single Poolz Transfer In with " + amountsLength + " iterations: ",
            gasPrice.toString()
        )
    }

    async function logMultiplyTransferInGasPrice(token, amount, iterations) {
        const gasPrice = await transferInGasPrice
            .connect(owner)
            .callStatic.getMultiplyTransferInGasPrice(token, amount, iterations)
        console.log(
            "Error: Gas Price for Multiply Poolz Transfer In with " + iterations + " iterations: ",
            gasPrice.toString()
        )
    }
})
