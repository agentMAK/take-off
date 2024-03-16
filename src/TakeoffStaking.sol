// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.20;

// Import OpenZeppelin libraries for security
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


    //@notice Staking contract for users to stake and receive votes
contract StakingContract {
    // Address of the cUSD token contract
    address public cUSDTokenAddress;

    // Timeframe for available unstake function (7 days)
    uint256 public constant UNSTAKE_PERIOD = 7 days;

    // Mapping of user balances
    mapping(address => uint256) public balances;

    // Mapping of user voting power
    mapping(address => uint256) public votingPower;

    // Mapping of staking time
    mapping(address => uint256) public stakingTime;

    // Events to log deposit and vote actions
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    constructor(address _cUSDTokenAddress) {
        cUSDTokenAddress = _cUSDTokenAddress;
    }

    // Function to deposit cUSD tokens (1cUSD = 10 votes)
    function stake() external {
        // Transfer cUSD tokens from the user to this contract
        IERC20 cUSDToken = IERC20(cUSDTokenAddress);
        require(cUSDToken.transferFrom(msg.sender, address(this), 1), "Transfer failed");

        // Update user balance and voting power
        balances[msg.sender] += 1;
        votingPower[msg.sender] += 10;
        stakingTime[msg.sender] = block.timestamp;

        emit Deposit(msg.sender, 1);
    }

    // Function to withdraw deposited cUSD tokens
    function withdraw(uint256 amount) external {
        // Require that the user has enough balance to withdraw
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // Ensure that the unstake period has passed
        require(block.timestamp >= stakingTime[msg.sender] + UNSTAKE_PERIOD, "Unstaking period has not passed yet");

        // Transfer cUSD tokens from this contract to the user
        IERC20 cUSDToken = IERC20(cUSDTokenAddress);
        require(cUSDToken.transfer(msg.sender, amount), "Transfer failed");

        // Update user balance
        balances[msg.sender] -= amount;
        votingPower[msg.sender] -= amount;

        emit Withdraw(msg.sender, amount);
    }
}