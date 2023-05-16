// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "poolz-helper-v2/contracts/ERC20Helper.sol";

///@title Contract for checking of differences between gas price Poolz transfer helper functions
contract TransferInGasPrice is ERC20Helper {
    // test for the single poolz transfer with sum
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

    // test for the multiply poolz transfer
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
}
