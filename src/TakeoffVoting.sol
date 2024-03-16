// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

// Interface for DeployedContract
interface IStakingContract {
    function checkVotingPower(address user) external view returns (uint256);
}

contract VotingContract is Ownable {

	/// @notice Address of the staking contract
	IStakingContract public stakingTakeoff; 

    /// @notice Flag indicating whether the votes are open or not
    bool public votesOpen;

    /// @notice Timestamp of the votes next closing date and time
    uint256 public votesClosingTime;

///EVENTS///

    event Voted(address voter);
    event Open(uint blockTimestamp, uint closingTime);

	constructor(address initialOwner, address _stakingContract) Ownable(initialOwner) {
		stakingTakeoff = IStakingContract(_stakingContract);

	}

///EXTERNAL FUNCTIONS///

	   /// @notice Opens the lottery for receiving bets
    function openVotes(uint256 _closingTime) public onlyOwner whenVotesClosed {
        require(
            _closingTime > block.timestamp,
            "Closing time must be in the future"
        );
        votesClosingTime = _closingTime;
        votesOpen = true;
        emit Open(block.timestamp, _closingTime);
    }

	//@notice Function to vote on a campaign (only when voting period starts)
	function vote() public whenVotesOpen {
		require(stakingTakeoff.checkVotingPower(msg.sender) > 0);

    	emit Voted(msg.sender);

	} 

///MODIFIERS///

    /// @notice When votes are at closed state
    modifier whenVotesClosed() {
        require(!votesOpen, "Lottery is open");
        _;
    }

    /// @notice Passes when the lottery is at open state and the current block timestamp is lower than the lottery closing date
    modifier whenVotesOpen() {
        require(
            votesOpen && block.timestamp < votesClosingTime,
            "Lottery is closed"
        );
        _;
    }
}