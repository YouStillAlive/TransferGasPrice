// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "poolz-helper-v2/contracts/ERC20Helper.sol";

///@title Contract for checking of differences between gas price transfer functions
contract TransferGasPrice is ERC20Helper {
    // test for the single poolz transfer in function
    function getSingleTransferInGasPrice(
        address token,
        uint256 amount
    ) external returns (uint256) {
        uint256 gasBefore = gasleft();
        TransferInToken(token, msg.sender, amount);
        return gasBefore - gasleft();
    }

    // test for the multiply poolz transfer in function
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

    // test for the single transfer from function
    function getSingleTransferFromGasPrice(
        address token,
        uint256 amount
    ) external returns (uint256) {
        uint256 gasBefore = gasleft();
        ERC20(token).transferFrom(msg.sender, address(this), amount);
        return gasBefore - gasleft();
    }

    // test for the multiply transfer from function
    function getMultiplyTransferFromGasPrice(
        address token,
        uint256 amount,
        uint256 iterations
    ) external returns (uint256) {
        uint256 gasBefore = gasleft();
        for (uint256 i = 0; i < iterations; ++i)
            ERC20(token).transferFrom(msg.sender, address(this), amount);
        return gasBefore - gasleft();
    }
}
