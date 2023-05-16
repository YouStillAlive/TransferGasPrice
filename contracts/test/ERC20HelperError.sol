// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "poolz-helper-v2/contracts/ERC20Helper.sol";

contract ERC20HelperError is ERC20Helper {
    error IncorrectAmount(uint256 oldBalance, uint256 withdrawAmount);
    error GreaterThanZero(uint256 amount);
    error NoAllowance(address token, uint256 amount);

    function TransferInTokenWithError(
        address token,
        address subject,
        uint256 amount
    ) internal {
        if (ERC20(token).allowance(subject, address(this)) <= amount) {
            revert NoAllowance(token, amount);
        }
        if (amount == 0) {
            revert GreaterThanZero(amount);
        }
        uint256 oldBalance = ERC20(token).balanceOf(address(this));
        ERC20(token).transferFrom(subject, address(this), amount);
        emit TransferIn(amount, subject, token);
        if ((oldBalance + amount) != ERC20(token).balanceOf(address(this))) {
            revert IncorrectAmount(oldBalance, amount);
        }
    }
}
