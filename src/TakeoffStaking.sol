// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.18;

// Import OpenZeppelin libraries for security
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

    //@notice Staking contract for users to stake and receive votes
contract StakingContract {
    // Address of the cUSD token contract
    address public cUSDTokenAddress;

    // Mapping of user balances
    mapping(address => uint256) public balances;

    // Mapping of user voting power
    mapping(address => uint256) public votingPower;

    // Events to log deposit and vote actions
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event Vote(address indexed user, uint256 talentId);

    constructor(address _cUSDTokenAddress) {
        cUSDTokenAddress = _cUSDTokenAddress;
    }

    // Function to deposit cUSD tokens
    function stake(uint256 amount) external {
        // Transfer cUSD tokens from the user to this contract
        IERC20 cUSDToken = IERC20(cUSDTokenAddress);
        require(cUSDToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        // Update user balance and voting power
        balances[msg.sender] += amount;
        votingPower[msg.sender] += amount;

        emit Deposit(msg.sender, amount);
    }

    // Function to withdraw deposited cUSD tokens
    function withdraw(uint256 amount) external {
        // Require that the user has enough balance to withdraw
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // Transfer cUSD tokens from this contract to the user
        IERC20 cUSDToken = IERC20(cUSDTokenAddress);
        require(cUSDToken.transfer(msg.sender, amount), "Transfer failed");

        // Update user balance
        balances[msg.sender] -= amount;

        emit Withdraw(msg.sender, amount);
    }
}