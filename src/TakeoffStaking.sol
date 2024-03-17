// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.20;

// Import OpenZeppelin libraries for security
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Takeoff Voting Contract
 * @author  Filipe Rey
 * @notice Staking contract to stake and receive votes.
 */
contract TakeoffStaking is Ownable {
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

    // Voting contract address
    address public votingContractAddress;

    // Events to log deposit and vote actions
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    //@param _cUSDTokenAddress Address of the cUSD token
    constructor(address _cUSDTokenAddress, address _initialOwner) Ownable(_initialOwner) {
        cUSDTokenAddress = _cUSDTokenAddress;
    }

    // Function to deposit cUSD tokens (1cUSD = 1 vote)
    function stake(uint256 amount) public {
        // Transfer cUSD tokens from the user to this contract
        IERC20 cUSDToken = IERC20(cUSDTokenAddress);
        require(cUSDToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        // Update user balance and voting power
        balances[msg.sender] += amount;
        votingPower[msg.sender] += amount;
        stakingTime[msg.sender] = block.timestamp;

        emit Deposit(msg.sender, 1);
    }

    ///@notice Function to withdraw deposited cUSD tokens
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance"); // Require that the user has enough balance to withdraw
        require(block.timestamp >= stakingTime[msg.sender] + UNSTAKE_PERIOD, "Unstaking period has not passed yet"); // Ensure that the unstake period has passed
        IERC20 cUSDToken = IERC20(cUSDTokenAddress); // Transfer cUSD tokens from this contract to the user
        require(cUSDToken.transfer(msg.sender, amount), "Transfer failed");
        balances[msg.sender] -= amount; // Update user balance
        votingPower[msg.sender] -= amount;

        emit Withdraw(msg.sender, amount);
    }

    ///@notice Only the TakeoffVoting can decrease a users voting power
    //@param _address The address of TakeoffVoting contract
    function setVotingContractAddress(address _votingContractAddress) public onlyOwner {
        require(votingContractAddress == address(0));
        votingContractAddress = _votingContractAddress;
    }

    ///@notice Checks a user voting power
    function checkVotingPower(address _user) public view returns (uint256) {
        return votingPower[_user];
    }

    ///@notice Only the TakeoffVoting can decrease a users voting power
    //@param _user The address of the user who voted
    //@param _amount The amount of votes user inputed
    function reduceVotingPower(address _user, uint256 _amount) external onlyVotingContract {
        votingPower[_user] -= _amount;
    }

    modifier onlyVotingContract() {
        require(msg.sender == votingContractAddress);
        _;
    }
}