# TransferGasPrice

The contract was created in order to find out the gas price when using the TransferIn helper function of the [Poolz-helper](https://github.com/The-Poolz/Poolz-Helper) contract.

### Navigation

- [Installation](#installation)
- [Results](#results)
- [License](#license)

#### Installation

```console
yarn install
```

#### Testing

```console
npx hardhat coverage
```

#### Deploy

```console
npx hardhat run --network <your-network> scripts/deploy.js
```

## Results
Test result using Single Poolz Transfer In calls:
```solidity
function getSingleTransferInGasPrice(
        address token,
        uint256[] memory amounts
    ) external returns (uint256) {
        uint256 gasBefore = gasleft();
        uint256 totalAmount;
        uint256 length = amounts.length;
        for (uint256 i = 0; i < length; ++i) {
            totalAmount += amounts[i];
        }
        TransferInToken(token, msg.sender, totalAmount);
        return gasBefore - gasleft();
    }
```
```
Gas Price for Single Poolz Transfer In with 1 iterations:  45075
Gas Price for Single Poolz Transfer In with 5 iterations:  46879
Gas Price for Single Poolz Transfer In with 10 iterations:  49134
Gas Price for Single Poolz Transfer In with 50 iterations:  67176
Gas Price for Single Poolz Transfer In with 100 iterations:  89727
```
#
Test result using Multiply Poolz Transfer In calls:
```solidity
    function getMultiplyTransferInGasPrice(
        address token,
        uint256 amount,
        uint256 iterations
    ) external returns (uint256) {
        uint256 gasBefore = gasleft();
        for (uint256 i = 0; i < iterations; ++i)
            TransferInToken(token, msg.sender, amount);
        return gasBefore - gasleft();
    }
```
```

Gas Price for Multiply Poolz Transfer In with 1 iterations:  44641
Gas Price for Multiply Poolz Transfer In with 5 iterations:  97654
Gas Price for Multiply Poolz Transfer In with 10 iterations:  163922
Gas Price for Multiply Poolz Transfer In with 50 iterations:  694120
Gas Price for Multiply Poolz Transfer In with 100 iterations:  1357009
```
### Using Custom Errors 
Test result using Single Poolz Transfer In calls with Custom errors:

```
Custom Error: Gas Price for Single Poolz Transfer In with 1 iterations:  45617
Custom Error: Gas Price for Single Poolz Transfer In with 5 iterations:  47421
Custom Error: Gas Price for Single Poolz Transfer In with 10 iterations:  49676
Custom Error: Gas Price for Single Poolz Transfer In with 50 iterations:  67718
Custom Error: Gas Price for Single Poolz Transfer In with 100 iterations:  90269
```
Test result using Multiply Poolz Transfer In calls with Custom errors:
```
Error: Gas Price for Multiply Poolz Transfer In with 1 iterations:  45183
Error: Gas Price for Multiply Poolz Transfer In with 5 iterations:  100364
Error: Gas Price for Multiply Poolz Transfer In with 10 iterations:  169342
Error: Gas Price for Multiply Poolz Transfer In with 50 iterations:  721220
Error: Gas Price for Multiply Poolz Transfer In with 100 iterations:  1411209
```


## License
Contract is released under the MIT License.