// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
// import "./TakeoffStaking.sol";

/// Interface for DeployedContract
interface IStakingContract {
    function checkVotingPower(address user) external view returns (uint256);
    function reduceVotingPower(address _user, uint256 _amount) external;
}

/**
 * @title Takeoff Voting Contract
 * @author  Filipe Rey
 * @dev This contract stores users everything related to voting campaigns.
 * 
 * 
 * Still things to refactor, like keeping track of the first five users with more votes in each campaign.
 * When a campaign period has ended, total grants will be distributed. 
 * Calculations to do off-chain.
 * 
 * For now it's one contract for campaign but idealy we refactor to deal with different campaigns at the time
 * and have two permanent contracts and one interface for every campaign.
 */
contract VotingContract is Ownable {

	/// @notice Address of the staking contract
	IStakingContract public stakingTakeoff; 

    /// @notice Flag indicating whether the votes are open or not
    bool public votesOpen;
    
    /// @notice Timestamp of the votes next closing date and time
    uint256 public votesClosingTime;

    ///@notice Mapping to store applicant total votes
    mapping(address => uint256) public votesGotten;

///EVENTS///

    event Voted(address indexed voter);
    event Open(uint blockTimestamp, uint closingTime);
    event PrizeDistributed(address indexed user, uint256 amount);

    ///@notice Sets the TakeoffStaking contract
	constructor(address initialOwner, address _stakingContract) Ownable(initialOwner) {
		stakingTakeoff = IStakingContract(_stakingContract);

	}

///FUNCTIONS///

	   ///@notice Opens the lottery for receiving bets
	   ///@param _closingTime The campaign closing period set by the owner
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
	//@param _for which address to vote on
	//@param _amount Amount of votes
	function vote(address _for, uint256 _amount) public whenVotesOpen {
		require(stakingTakeoff.checkVotingPower(msg.sender) <= _amount);
		votesGotten[_for] += _amount; // update the top 5 users based on the vote
		stakingTakeoff.reduceVotingPower(msg.sender, _amount); // update the voting power of the msg.sender in the staking contract

		// update the top5 candidates
    	emit Voted(msg.sender);

	}

///MODIFIERS///

    /// @notice When votes are at closed state
    modifier whenVotesClosed() {
        require(
        	!votesOpen,
        	"Lottery is open"
        );
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