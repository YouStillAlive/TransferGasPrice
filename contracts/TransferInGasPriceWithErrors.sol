// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./test/ERC20HelperError.sol";

contract TransferInGasPriceWithErrors is ERC20HelperError {
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
        TransferInTokenWithError(token, msg.sender, totalAmount);
        return gasBefore - gasleft();
    }

    function getMultiplyTransferInGasPrice(
        address token,
        uint256 amount,
        uint256 iterations
    ) external returns (uint256) {
        uint256 gasBefore = gasleft();
        for (uint256 i = 0; i < iterations; ++i)
            TransferInTokenWithError(token, msg.sender, amount);
        return gasBefore - gasleft();
    }
}
