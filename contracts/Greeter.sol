//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "../interfaces/IERC20.sol";

// TODO: change name to Aggregator
contract Greeter {
  IERC20 public vtho;
  address payable public owner;
  mapping(address => uint256) public balances;

  constructor(address _vthoAddr) {
    vtho = IERC20(_vthoAddr);
    owner = payable(msg.sender);
  }

	/// @notice Pull VTHO from user's wallet. Before pulling though,
	/// the user has to give allowance on the VTHO contract.
  /// @param _amount The amount of VTHO pulled from the user's address.
	function pull(address payable _sender, uint256 _amount) external {
		require(_amount > 0, "Greeter: Invalid amount");
		require(vtho.balanceOf(_sender) > _amount, "Greeter: Insufficient amount");

		balances[_sender] += _amount;

		// emit RenDeposited(sender, _amount);

		require(vtho.transferFrom(_sender, address(this), _amount), "Greeter: Pull failed");
	}
}
